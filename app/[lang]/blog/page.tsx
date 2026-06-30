import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleCard, BlogFooter, BlogHeader } from "@/components/blog-shell";
import { listPublishedArticles } from "@/lib/articles";
import { blogCopy } from "@/lib/blog-copy";
import { isLocale } from "@/lib/i18n";
import { getSiteUrl } from "@/lib/site-url";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const siteUrl = getSiteUrl();
  const t = blogCopy[lang];
  return {
    title: `${t.blog} | AL MUMAYIZ`,
    description: t.intro,
    alternates: {
      canonical: `${siteUrl}/${lang}/blog`,
      languages: {
        fr: `${siteUrl}/fr/blog`,
        en: `${siteUrl}/en/blog`,
        ar: `${siteUrl}/ar/blog`,
        "x-default": `${siteUrl}/fr/blog`,
      },
    },
    openGraph: {
      title: `${t.blog} | AL MUMAYIZ`,
      description: t.intro,
      type: "website",
      url: `${siteUrl}/${lang}/blog`,
      images: [{ url: `${siteUrl}/images/brand/og-default.jpg`, alt: "AL MUMAYIZ" }],
    },
  };
}

export default async function BlogPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const articles = await listPublishedArticles(lang);
  const t = blogCopy[lang];

  return (
    <>
      <BlogHeader locale={lang} />
      <main>
        <section className="blog-hero">
          <div className="page-shell">
            <p className="eyebrow">AL MUMAYIZ · {t.blog}</p>
            <h1>{t.title}</h1>
            <p>{t.intro}</p>
          </div>
        </section>
        <section className="blog-list page-shell">
          {articles.length
            ? articles.map((article) => (
                <ArticleCard key={article.id} article={article} locale={lang} />
              ))
            : (
                <div className="blog-empty">
                  <h2>{t.empty}</h2>
                  <p>{t.intro}</p>
                </div>
              )
          }
        </section>
      </main>
      <BlogFooter locale={lang} />
    </>
  );
}
