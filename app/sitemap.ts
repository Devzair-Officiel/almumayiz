import type { MetadataRoute } from "next";
import prisma from "@/lib/prisma";
import { locales } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";
  const staticRoutes = locales.flatMap((locale) => [
    { url: `${baseUrl}/${locale}`, changeFrequency: "weekly" as const, priority: 1 },
    { url: `${baseUrl}/${locale}/blog`, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/${locale}/mentions-legales`, changeFrequency: "yearly" as const, priority: 0.2 },
    { url: `${baseUrl}/${locale}/confidentialite`, changeFrequency: "yearly" as const, priority: 0.2 },
  ]);
  const articles = await prisma.article.findMany({ where: { status: "PUBLISHED", publishedAt: { lte: new Date() } }, select: { locale: true, slug: true, updatedAt: true } });
  return [...staticRoutes, ...articles.map((article) => ({ url: `${baseUrl}/${article.locale}/blog/${article.slug}`, lastModified: article.updatedAt, changeFrequency: "monthly" as const, priority: 0.7 }))];
}
