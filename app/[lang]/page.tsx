import Image from "next/image";
import { notFound } from "next/navigation";
import { QuoteForm } from "@/components/quote-form";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { getDictionary, isLocale, type Dictionary, type Locale } from "@/lib/i18n";

export const dynamic = "force-dynamic";

const WHATSAPP_URL = process.env.WHATSAPP_URL ?? "https://wa.me/33761305011";
const WHATSAPP_DISPLAY = "+33 7 61 30 50 11";

function Hero({ copy }: { copy: Dictionary }) {
  return (
    <section className="hero" id="top">
      <div className="hero-copy page-shell">
        <div className="hero-text">
          <p className="eyebrow">{copy.hero.eyebrow}</p>
          <h1>{copy.hero.before}<em>{copy.hero.accent}</em>{copy.hero.after}</h1>
          <p className="hero-body">{copy.hero.body}</p>
          <div className="hero-actions">
            <a className="button button-gold" href="#contact">{copy.hero.quote}</a>
            <a className="button button-outline" href={WHATSAPP_URL} target="_blank" rel="noreferrer">{copy.hero.whatsapp} ↗</a>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <span className="hero-orbit orbit-one" /><span className="hero-orbit orbit-two" />
          <Image src="/images/brand/logo-full.webp" width={680} height={412} alt="" priority={true} />
          <span className="made-tag">MADE IN<br /><strong>EGYPT</strong></span>
        </div>
      </div>
      <div className="stats page-shell">{copy.stats.map((stat) => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div>
    </section>
  );
}

function Products({ copy }: { copy: Dictionary }) {
  return (
    <section className="section products page-shell" id="products">
      <div className="section-heading split-heading"><div><p className="eyebrow">{copy.products.eyebrow}</p><h2>{copy.products.title}</h2></div><p>{copy.products.body}</p></div>
      <div className="product-grid">
        {copy.products.items.map((product, index) => (
          <article className="product-card" key={product.name}>
            <span className="product-number">0{index + 1}</span>
            <div className="product-image"><Image src={product.image} width={300} height={320} alt={product.name} loading={index === 0 ? "eager" : "lazy"} /></div>
            <h3>{product.name}</h3><p>{product.description}</p>
          </article>
        ))}
      </div>
      <div className="oem-banner"><div><span>OEM</span><div><h3>{copy.products.customTitle}</h3><p>{copy.products.customBody}</p></div></div><strong>{copy.products.minimum}</strong></div>
    </section>
  );
}

function Why({ copy }: { copy: Dictionary }) {
  return (
    <section className="section why" id="why"><div className="page-shell"><p className="eyebrow">{copy.why.eyebrow}</p><h2>{copy.why.title}</h2>
      <div className="feature-grid">{copy.why.items.map((item, index) => <article key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.body}</p></article>)}</div>
    </div></section>
  );
}

function Factory({ copy }: { copy: Dictionary }) {
  return (
    <section className="section factory" id="factory"><div className="page-shell factory-grid">
      <div className="factory-image"><Image src="/images/factory/atelier-chechias.webp" fill sizes="(max-width: 900px) 100vw, 50vw" alt={copy.factory.title} /></div>
      <div className="factory-copy"><p className="eyebrow">{copy.factory.eyebrow}</p><h2>{copy.factory.title}</h2><p>{copy.factory.body}</p><div className="factory-stats">{copy.factory.stats.map((stat) => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div></div>
    </div></section>
  );
}

function Process({ copy }: { copy: Dictionary }) {
  return (
    <section className="section process page-shell" id="process"><h2>{copy.process.title}</h2><div className="process-grid">{copy.process.items.map((item, index) => <article key={item.title}><span>{index + 1}</span><div><h3>{item.title}</h3><p>{item.body}</p></div></article>)}</div></section>
  );
}

function Contact({ locale, copy }: { locale: Locale; copy: Dictionary }) {
  const turnstileSiteKey = process.env.TURNSTILE_SITE_KEY
    ?? "1x00000000000000000000AA";
  return (
    <section className="section contact" id="contact"><div className="page-shell contact-grid">
      <div className="contact-copy"><p className="eyebrow">B2B · AL MUMAYIZ</p><h2>{copy.form.title}</h2><p>{copy.form.body}</p><strong className="response-time">✓ {copy.form.response}</strong>
        <div className="direct-contact"><h3>{copy.form.direct}</h3><p>{copy.form.directBody}</p><a href={WHATSAPP_URL} target="_blank" rel="noreferrer">{copy.form.whatsapp} · <bdi>{WHATSAPP_DISPLAY}</bdi> ↗</a></div>
      </div>
      <QuoteForm locale={locale} copy={copy.form} turnstileSiteKey={turnstileSiteKey} />
    </div></section>
  );
}

function Faq({ copy }: { copy: Dictionary }) {
  return (
    <section className="section faq" id="faq"><div className="page-shell"><h2>{copy.faq.title}</h2><div className="faq-list">{copy.faq.items.map((item) => <details key={item.question}><summary>{item.question}<span>+</span></summary><p>{item.answer}</p></details>)}</div></div></section>
  );
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const copy = await getDictionary(lang);
  return <><SiteHeader locale={lang} copy={copy} /><main><Hero copy={copy} /><section className="markets"><div className="page-shell"><p>{copy.markets.title}</p><div>{copy.markets.items.map((market) => <span key={market}>{market}</span>)}</div></div></section><Products copy={copy} /><Why copy={copy} /><Factory copy={copy} /><Process copy={copy} /><section className="seo-block"><div className="page-shell"><h2>{copy.seo.title}</h2><p>{copy.seo.body}</p></div></section><Contact locale={lang} copy={copy} /><Faq copy={copy} /></main><SiteFooter locale={lang} copy={copy} /></>;
}
