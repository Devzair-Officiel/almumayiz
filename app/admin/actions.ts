"use server";

import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";
import prisma from "@/lib/prisma";
import { consumeRateLimit } from "@/lib/rate-limit";
import { createAdminSession, deleteAdminSession, requireAdmin, verifyAdminCredentials } from "@/lib/admin-auth";
import { articleInputFromForm } from "@/lib/articles";
import { removeArticleImage, saveArticleImage } from "@/lib/article-images";

export type AdminFormState = { error?: string };

const errorMessage = (error: unknown) => {
  if (error instanceof ZodError) return error.issues[0]?.message ?? "Champs invalides";
  if (error instanceof Error && error.message.includes("Unique constraint")) return "Ce slug existe déjà dans cette langue";
  return error instanceof Error ? error.message : "Une erreur est survenue";
};

export async function loginAction(_state: AdminFormState, formData: FormData): Promise<AdminFormState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const requestHeaders = await headers();
  const ip = requestHeaders.get("cf-connecting-ip") ?? requestHeaders.get("x-real-ip") ?? requestHeaders.get("x-forwarded-for")?.split(",").at(-1)?.trim() ?? "unknown";
  const ipHash = createHash("sha256").update(ip).digest("hex");

  try {
    if (!await consumeRateLimit(`admin-login:${ipHash}`, 8, 15 * 60)) return { error: "Trop de tentatives. Réessayez dans 15 minutes." };
    if (!await verifyAdminCredentials(email, password)) return { error: "Identifiants incorrects." };
    await createAdminSession();
  } catch (error) {
    console.error("Admin login failed", error);
    return { error: "La connexion administrateur n’est pas encore configurée." };
  }
  redirect("/admin");
}

export async function logoutAction() {
  await deleteAdminSession();
  redirect("/admin/login");
}

export async function createArticleAction(_state: AdminFormState, formData: FormData): Promise<AdminFormState> {
  await requireAdmin();
  let uploadedImage: string | null = null;
  let articlePath = "/fr/blog";
  try {
    const input = articleInputFromForm(formData);
    const file = formData.get("coverImage");
    uploadedImage = file instanceof File ? await saveArticleImage(file) : null;
    const article = await prisma.article.create({ data: { ...input, coverImage: uploadedImage ?? input.coverImage } });
    articlePath = `/${article.locale}/blog`;
  } catch (error) {
    if (uploadedImage) await removeArticleImage(uploadedImage);
    return { error: errorMessage(error) };
  }
  revalidatePath(articlePath);
  redirect("/admin");
}

export async function updateArticleAction(id: number, _state: AdminFormState, formData: FormData): Promise<AdminFormState> {
  await requireAdmin();
  let uploadedImage: string | null = null;
  const paths = new Set<string>();
  try {
    const existing = await prisma.article.findUniqueOrThrow({ where: { id } });
    const input = articleInputFromForm(formData);
    const file = formData.get("coverImage");
    uploadedImage = file instanceof File ? await saveArticleImage(file) : null;
    const article = await prisma.article.update({ where: { id }, data: { ...input, coverImage: uploadedImage ?? input.coverImage } });
    if (uploadedImage && existing.coverImage !== uploadedImage) await removeArticleImage(existing.coverImage);
    paths.add(`/${existing.locale}/blog`);
    paths.add(`/${article.locale}/blog`);
  } catch (error) {
    if (uploadedImage) await removeArticleImage(uploadedImage);
    return { error: errorMessage(error) };
  }
  for (const path of paths) revalidatePath(path);
  redirect("/admin");
}

export async function deleteArticleAction(id: number) {
  await requireAdmin();
  const article = await prisma.article.delete({ where: { id } });
  await removeArticleImage(article.coverImage);
  revalidatePath(`/${article.locale}/blog`);
  redirect("/admin");
}
