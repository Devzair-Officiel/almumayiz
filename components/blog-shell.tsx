import Image from "next/image";
import Link from "next/link";
import { blogCopy } from "@/lib/blog-copy";
import type { Locale } from "@/lib/i18n";

export function BlogHeader({ locale }: { locale: Locale }) {
  const t = blogCopy[locale];
  return <header className="blog-header page-shell"><Link href={`/${locale}`} className="blog-logo"><Image src="/images/brand/wordmark.png" width={661} height={134} alt="AL MUMAYIZ" loading="eager" /></Link><nav><Link href={`/${locale}`}>{t.home}</Link><Link href={`/${locale}/blog`}>{t.blog}</Link><Link className="button button-dark" href={`/${locale}#contact`}>{t.contact}</Link></nav></header>;
}

export function BlogFooter({ locale }: { locale: Locale }) {
  return <footer className="blog-footer"><div className="page-shell"><span>© {new Date().getFullYear()} AL MUMAYIZ</span><div><Link href={`/${locale}/mentions-legales`}>{locale === "fr" ? "Mentions légales" : locale === "en" ? "Legal notice" : "الإشعار القانوني"}</Link><Link href={`/${locale}/confidentialite`}>{locale === "fr" ? "Confidentialité" : locale === "en" ? "Privacy" : "الخصوصية"}</Link></div></div></footer>;
}

export function ArticleCard({ article, locale }: { article: { slug: string; title: string; excerpt: string; coverImage: string | null; publishedAt: Date | null; content: string }; locale: Locale }) {
  const t = blogCopy[locale];
  return <article className="article-card"><Link href={`/${locale}/blog/${article.slug}`} className="article-card-image">{article.coverImage ? <Image src={article.coverImage} fill sizes="(max-width: 780px) 100vw, 40vw" alt="" /> : <span>AL MUMAYIZ</span>}</Link><div className="article-card-body"><time dateTime={article.publishedAt?.toISOString()}>{article.publishedAt?.toLocaleDateString(locale === "ar" ? "ar-EG" : locale, { dateStyle: "long" })}</time><h2><Link href={`/${locale}/blog/${article.slug}`}>{article.title}</Link></h2><p>{article.excerpt}</p><Link className="article-read" href={`/${locale}/blog/${article.slug}`}>{t.read} →</Link></div></article>;
}
