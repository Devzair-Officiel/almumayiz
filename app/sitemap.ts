import type { MetadataRoute } from "next";
import prisma from "@/lib/prisma";
import { locales } from "@/lib/i18n";
import { getSiteUrl } from "@/lib/site-url";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl();

  const staticRoutes: MetadataRoute.Sitemap = [
    ...locales.flatMap((locale) => [
      { url: `${baseUrl}/${locale}`, changeFrequency: "weekly" as const, priority: 1 },
      { url: `${baseUrl}/${locale}/a-propos`, changeFrequency: "monthly" as const, priority: 0.6 },
      { url: `${baseUrl}/${locale}/blog`, changeFrequency: "weekly" as const, priority: 0.8 },
    ]),
    { url: `${baseUrl}/fr/grossiste-chechia`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/fr/fabricant-chechia`, changeFrequency: "monthly" as const, priority: 0.7 },
  ];

  const articles = await prisma.article.findMany({
    where: { status: "PUBLISHED", publishedAt: { lte: new Date() } },
    select: { locale: true, slug: true, updatedAt: true, publishedAt: true },
  }).catch(() => [] as { locale: string; slug: string; updatedAt: Date; publishedAt: Date | null }[]);

  return [
    ...staticRoutes,
    ...articles.map((article: { locale: string; slug: string; updatedAt: Date; publishedAt: Date | null }) => ({
      url: `${baseUrl}/${article.locale}/blog/${article.slug}`,
      lastModified: article.updatedAt ?? article.publishedAt ?? undefined,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
