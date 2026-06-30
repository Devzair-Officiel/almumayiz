import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, locales } from "@/lib/i18n";
import { getSiteUrl } from "@/lib/site-url";
import { CookieBanner } from "@/components/cookie-banner";
import "../globals.css";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

type LocaleLayoutProps = { children: React.ReactNode; params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { metadata } = await getDictionary(lang);
  return {
    title: metadata.title,
    description: metadata.description,
    metadataBase: new URL(getSiteUrl()),
    alternates: { canonical: `/${lang}`, languages: { fr: "/fr", en: "/en", ar: "/ar", "x-default": "/fr" } },
    openGraph: { title: metadata.title, description: metadata.description, type: "website", images: ["/images/brand/og-default.jpg"] },
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dictionary = await getDictionary(lang);
  return (
    <html lang={lang} dir={dictionary.direction}>
      <body>
        {children}
        <CookieBanner locale={lang} />
      </body>
    </html>
  );
}
