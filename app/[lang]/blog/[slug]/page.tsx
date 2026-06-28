import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard, BlogFooter, BlogHeader } from "@/components/blog-shell";
import { getPublishedArticle, listPublishedArticles } from "@/lib/articles";
import { blogCopy } from "@/lib/blog-copy";
import { isLocale } from "@/lib/i18n";
import { markdownToHtml, readingTime } from "@/lib/markdown";

export const dynamic = "force-dynamic";
type Props = { params: Promise<{ lang: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const article = await getPublishedArticle(lang, slug);
  if (!article) return {};
  const title = article.seoTitle || article.title;
  const description = article.seoDescription || article.excerpt;
  const canonical = article.canonicalUrl || `/${lang}/blog/${article.slug}`;
  const images = article.coverImage ? [{ url: article.coverImage, alt: article.title }] : undefined;
  return {
    title,
    description,
    keywords: article.seoKeywords?.split(",").map((keyword) => keyword.trim()).filter(Boolean),
    alternates: { canonical },
    openGraph: { type: "article", title, description, url: canonical, publishedTime: article.publishedAt?.toISOString(), modifiedTime: article.updatedAt.toISOString(), authors: [article.author], images },
    twitter: { card: article.coverImage ? "summary_large_image" : "summary", title, description, images: article.coverImage ? [article.coverImage] : undefined },
    robots: { index: true, follow: true },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const article = await getPublishedArticle(lang, slug);
  if (!article) notFound();
  const html = await markdownToHtml(article.content);
  const related = (await listPublishedArticles(lang)).filter((item) => item.id !== article.id).slice(0, 3);
  const t = blogCopy[lang];
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";
  const jsonLd = { "@context": "https://schema.org", "@type": "Article", headline: article.title, description: article.excerpt, image: article.coverImage ? new URL(article.coverImage, baseUrl).toString() : undefined, datePublished: article.publishedAt?.toISOString(), dateModified: article.updatedAt.toISOString(), author: { "@type": "Organization", name: article.author }, publisher: { "@type": "Organization", name: "AL MUMAYIZ" }, mainEntityOfPage: new URL(`/${lang}/blog/${article.slug}`, baseUrl).toString() };
  return <><BlogHeader locale={lang} /><main><article className="blog-article"><header className="article-hero page-shell"><Link href={`/${lang}/blog`}>← {t.back}</Link><p className="eyebrow">AL MUMAYIZ · {t.blog}</p><h1>{article.title}</h1><p className="article-lead">{article.excerpt}</p><div className="article-meta"><span>{article.author}</span><time dateTime={article.publishedAt?.toISOString()}>{t.published} {article.publishedAt?.toLocaleDateString(lang === "ar" ? "ar-EG" : lang, { dateStyle: "long" })}</time><span>{readingTime(article.content)} {t.minutes}</span></div></header>{article.coverImage && <div className="article-cover page-shell"><Image src={article.coverImage} fill sizes="(max-width: 1200px) 100vw, 1180px" alt={article.title} preload /></div>}<div className="article-prose page-shell" dangerouslySetInnerHTML={{ __html: html }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} /></article>{related.length > 0 && <section className="related-articles page-shell"><h2>{t.related}</h2><div>{related.map((item) => <ArticleCard key={item.id} article={item} locale={lang} />)}</div></section>}</main><BlogFooter locale={lang} /></>;
}
