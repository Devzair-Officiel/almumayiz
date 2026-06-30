import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import "../../about.css";
import { SiteFooter, SiteHeader, WHATSAPP_URL } from "@/components/site-shell";
import { getDictionary, isLocale } from "@/lib/i18n";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const copy = await getDictionary(lang);
  return {
    title: `${copy.about.title} | AL MUMAYIZ`,
    description: copy.about.sub,
    alternates: {
      canonical: `${SITE_URL}/${lang}/a-propos`,
      languages: {
        fr: `${SITE_URL}/fr/a-propos`,
        en: `${SITE_URL}/en/a-propos`,
        ar: `${SITE_URL}/ar/a-propos`,
      },
    },
    openGraph: {
      title: `${copy.about.title} | AL MUMAYIZ`,
      description: copy.about.sub,
      type: "website",
      url: `${SITE_URL}/${lang}/a-propos`,
      images: [{ url: `${SITE_URL}/images/factory/usine-a-propos.webp`, alt: copy.about.title }],
    },
    robots: { index: true, follow: true },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const copy = await getDictionary(lang);
  const t = copy.about;

  return (
    <>
      <SiteHeader locale={lang} copy={copy} />
      <main>
        <section className="about-hero">
          <div className="page-shell">
            <p className="eyebrow">{t.eyebrow}</p>
            <h1>{t.title}</h1>
            <p>{t.sub}</p>
          </div>
        </section>

        <section className="section story">
          <div className="page-shell story-grid">
            <div className="story-copy">
              <p className="eyebrow">{t.storyEyebrow}</p>
              <h2>{t.storyTitle}</h2>
              <p>{t.storyP1}</p>
              <p>{t.storyP2}</p>
            </div>
            <div className="story-image">
              <Image src="/images/factory/usine-a-propos.webp" fill sizes="(max-width: 900px) 100vw, 50vw" alt={t.storyTitle} />
            </div>
          </div>
        </section>

        <section className="mission-quote">
          <div className="page-shell">
            <span>“</span>
            <p>{t.mission}</p>
          </div>
        </section>

        <section className="section why">
          <div className="page-shell">
            <p className="eyebrow">{t.valuesEyebrow}</p>
            <h2>{t.valuesTitle}</h2>
            <div className="feature-grid">
              {t.values.map((item, index) => (
                <article key={item.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="about-stats">
          <div className="page-shell factory-stats">
            {copy.factory.stats.map((stat) => (
              <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>
            ))}
          </div>
        </section>

        <section className="about-cta">
          <div className="page-shell">
            <h2>{t.ctaTitle}</h2>
            <p>{t.ctaSub}</p>
            <div className="hero-actions">
              <a className="button button-gold" href={`/${lang}#contact`}>{copy.hero.quote}</a>
              <a className="button button-outline" href={WHATSAPP_URL} target="_blank" rel="noreferrer">{copy.hero.whatsapp} ↗</a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter locale={lang} copy={copy} />
    </>
  );
}
