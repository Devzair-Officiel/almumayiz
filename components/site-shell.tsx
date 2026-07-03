import Image from "next/image";
import Link from "next/link";
import { type Dictionary, type Locale } from "@/lib/i18n";
import { LanguageLinks } from "@/components/language-links";

export { LanguageLinks };
export const WHATSAPP_URL = process.env.WHATSAPP_URL ?? "https://wa.me/33761305011";
export const WHATSAPP_DISPLAY = process.env.WHATSAPP_DISPLAY ?? "+33 7 61 30 50 11";

export function SiteHeader({ locale, copy }: { locale: Locale; copy: Dictionary }) {
  return (
    <>
      <div className="topbar"><span>{copy.topbar}</span><a href={WHATSAPP_URL} target="_blank" rel="noreferrer">WhatsApp ↗</a></div>
      <header className="site-header">
        <Link href={`/${locale}`} aria-label="AL MUMAYIZ" className="brand-link">
          <Image src="/images/brand/wordmark.webp" width={661} height={134} alt="AL MUMAYIZ" priority sizes="(max-width: 780px) 145px, 176px" />
        </Link>
        <nav className="desktop-nav" aria-label="Navigation principale">
          <Link href={`/${locale}`}>{locale === "ar" ? "الرئيسية" : locale === "en" ? "Home" : "Accueil"}</Link>
          <Link href={`/${locale}/a-propos`}>{copy.nav.about}</Link>
          {locale === "fr" && <Link href="/fr/grossiste-chechia">Grossiste chéchia</Link>}
          {locale === "fr" && <Link href="/fr/fabricant-chechia">Fabricant chéchia</Link>}
          <Link href={`/${locale}/blog`}>{copy.nav.blog}</Link>
        </nav>
        <div className="header-actions"><LanguageLinks locale={locale} /><a className="button button-dark header-quote" href={`/${locale}#contact`}>{copy.nav.quote}</a></div>
        <details className="mobile-menu">
          <summary aria-label="Menu"><span /><span /><span /></summary>
          <nav><Link href={`/${locale}`}>{locale === "ar" ? "الرئيسية" : locale === "en" ? "Home" : "Accueil"}</Link><Link href={`/${locale}/a-propos`}>{copy.nav.about}</Link>{locale === "fr" && <Link href="/fr/grossiste-chechia">Grossiste chéchia</Link>}{locale === "fr" && <Link href="/fr/fabricant-chechia">Fabricant chéchia</Link>}<Link href={`/${locale}/blog`}>{copy.nav.blog}</Link><LanguageLinks locale={locale} /><a className="button button-dark" href={`/${locale}#contact`}>{copy.nav.quote}</a></nav>
        </details>
      </header>
    </>
  );
}

export function SiteFooter({ locale, copy }: { locale: Locale; copy: Dictionary }) {
  const home = locale === "ar" ? "الرئيسية" : locale === "en" ? "Home" : "Accueil";
  const navTitle = locale === "ar" ? "روابط" : locale === "en" ? "Navigation" : "Navigation";
  const contactTitle = locale === "ar" ? "تواصل معنا" : locale === "en" ? "Contact" : "Contact";
  const legalTitle = locale === "ar" ? "قانوني" : locale === "en" ? "Legal" : "Informations légales";
  return (
    <footer>
      <div className="page-shell footer-main">
        <div>
          <Image src="/images/brand/wordmark-cream.webp" width={661} height={134} alt="AL MUMAYIZ" />
          <p>{copy.footer.tagline}</p>
          <div className="footer-made-badge">★ Made in Egypt</div>
        </div>
        <div>
          <p className="footer-col-title">{navTitle}</p>
          <div className="footer-links">
            <Link href={`/${locale}`}>{home}</Link>
            <Link href={`/${locale}/a-propos`}>{copy.nav.about}</Link>
            {locale === "fr" && <Link href="/fr/grossiste-chechia">Grossiste chéchia</Link>}
            {locale === "fr" && <Link href="/fr/fabricant-chechia">Fabricant chéchia</Link>}
            <Link href={`/${locale}/blog`}>{copy.nav.blog}</Link>
          </div>
        </div>
        <div>
          <p className="footer-col-title">{contactTitle}</p>
          <div className="footer-links">
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">WhatsApp · <bdi>{WHATSAPP_DISPLAY}</bdi></a>
            <Link href={`/${locale}#contact`}>{copy.nav.quote}</Link>
          </div>
        </div>
        <div>
          <p className="footer-col-title">{legalTitle}</p>
          <div className="footer-links">
            <Link href={`/${locale}/mentions-legales`}>{copy.footer.legal}</Link>
            <Link href={`/${locale}/confidentialite`}>{copy.footer.privacy}</Link>
          </div>
          <LanguageLinks locale={locale} />
        </div>
      </div>
      <div className="page-shell footer-bottom"><span>© {new Date().getFullYear()} AL MUMAYIZ. {copy.footer.rights}</span><a href="https://devzair.com" target="_blank" rel="noreferrer">devzair</a></div>
    </footer>
  );
}
