import "server-only";

import { z } from "zod";
import prisma from "@/lib/prisma";
import { isLocale } from "@/lib/i18n";

export const articleSchema = z.object({
  locale: z.string().refine(isLocale, "Langue invalide"),
  title: z.string().trim().min(5).max(180),
  slug: z.string().trim().min(3).max(180).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  excerpt: z.string().trim().min(20).max(320),
  content: z.string().trim().min(50).max(100_000),
  coverImage: z.string().trim().max(500).nullable().optional(),
  seoTitle: z.string().trim().max(70).nullable().optional(),
  seoDescription: z.string().trim().max(170).nullable().optional(),
  seoKeywords: z.string().trim().max(300).nullable().optional(),
  canonicalUrl: z.string().trim().max(500).nullable().optional(),
  author: z.string().trim().min(2).max(120).default("AL MUMAYIZ"),
  status: z.enum(["DRAFT", "PUBLISHED"]),
  publishedAt: z.coerce.date().nullable().optional(),
});

export type ArticleInput = z.infer<typeof articleSchema>;

const nullable = (value: unknown) => {
  const text = String(value ?? "").trim();
  return text || null;
};

export function articleInputFromForm(formData: FormData): ArticleInput {
  const status = String(formData.get("status")) === "PUBLISHED" ? "PUBLISHED" : "DRAFT";
  const rawDate = nullable(formData.get("publishedAt"));
  return articleSchema.parse({
    locale: String(formData.get("locale") ?? "fr"),
    title: formData.get("title"),
    slug: formData.get("slug"),
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    coverImage: nullable(formData.get("existingCoverImage")),
    seoTitle: nullable(formData.get("seoTitle")),
    seoDescription: nullable(formData.get("seoDescription")),
    seoKeywords: nullable(formData.get("seoKeywords")),
    canonicalUrl: nullable(formData.get("canonicalUrl")),
    author: formData.get("author") || "AL MUMAYIZ",
    status,
    publishedAt: status === "PUBLISHED" ? (rawDate ? new Date(rawDate) : new Date()) : null,
  });
}

export async function listPublishedArticles(locale: string) {
  return prisma.article.findMany({
    where: { locale, status: "PUBLISHED", publishedAt: { lte: new Date() } },
    orderBy: { publishedAt: "desc" },
  });
}

export async function getPublishedArticle(locale: string, slug: string) {
  return prisma.article.findFirst({ where: { locale, slug, status: "PUBLISHED", publishedAt: { lte: new Date() } } });
}
