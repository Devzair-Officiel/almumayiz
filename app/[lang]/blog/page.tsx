import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleCard, BlogFooter, BlogHeader } from "@/components/blog-shell";
import { listPublishedArticles } from "@/lib/articles";
import { blogCopy } from "@/lib/blog-copy";
import { isLocale } from "@/lib/i18n";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = blogCopy[lang];
  return {
    title: `${t.blog} | AL MUMAYIZ`,
    description: t.intro,
    alternates: {
      canonical: `${SITE_URL}/${lang}/blog`,
      languages: {
        fr: `${SITE_URL}/fr/blog`,
        en: `${SITE_URL}/en/blog`,
        ar: `${SITE_URL}/ar/blog`,
      },
    },
    openGraph: {
      title: `${t.blog} | AL MUMAYIZ`,
      description: t.intro,
      type: "website",
      url: `${SITE_URL}/${lang}/blog`,
      images: [{ url: `${SITE_URL}/images/brand/og-default.jpg`, alt: "AL MUMAYIZ" }],
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
