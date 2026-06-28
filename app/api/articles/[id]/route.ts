import { isApiAuthorized, unauthorizedResponse } from "@/lib/api-auth";
import { articleSchema } from "@/lib/articles";
import { removeArticleImage } from "@/lib/article-images";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

const articleId = async (params: Promise<{ id: string }>) => {
  const id = Number((await params).id);
  return Number.isInteger(id) && id > 0 ? id : null;
};

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isApiAuthorized(request)) return unauthorizedResponse();
  const id = await articleId(params);
  if (!id) return Response.json({ error: "Invalid id" }, { status: 400 });
  const article = await prisma.article.findUnique({ where: { id } });
  return article ? Response.json({ data: article }) : Response.json({ error: "Not found" }, { status: 404 });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isApiAuthorized(request)) return unauthorizedResponse();
  const id = await articleId(params);
  if (!id) return Response.json({ error: "Invalid id" }, { status: 400 });
  try {
    const existing = await prisma.article.findUnique({ where: { id } });
    if (!existing) return Response.json({ error: "Not found" }, { status: 404 });
    const parsed = articleSchema.partial().parse(await request.json());
    const data = {
      ...parsed,
      ...(parsed.status === "PUBLISHED" && !parsed.publishedAt && !existing.publishedAt ? { publishedAt: new Date() } : {}),
      ...(parsed.status === "DRAFT" ? { publishedAt: null } : {}),
    };
    const article = await prisma.article.update({ where: { id }, data });
    if (parsed.coverImage !== undefined && parsed.coverImage !== existing.coverImage) await removeArticleImage(existing.coverImage);
    return Response.json({ data: article });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Invalid article" }, { status: 400 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isApiAuthorized(request)) return unauthorizedResponse();
  const id = await articleId(params);
  if (!id) return Response.json({ error: "Invalid id" }, { status: 400 });
  const article = await prisma.article.findUnique({ where: { id } });
  if (!article) return Response.json({ error: "Not found" }, { status: 404 });
  await prisma.article.delete({ where: { id } });
  await removeArticleImage(article.coverImage);
  return new Response(null, { status: 204 });
}
