import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";

export function LegalPage({ locale, title, updated, children }: { locale: Locale; title: string; updated: string; children: React.ReactNode }) {
  return (
    <>
      <header className="legal-header page-shell">
        <Link href={`/${locale}`} aria-label="AL MUMAYIZ">
          <Image src="/images/brand/wordmark.webp" width={661} height={134} alt="AL MUMAYIZ" loading="eager" />
        </Link>
        <Link href={`/${locale}`}>← {locale === "ar" ? "العودة إلى الموقع" : locale === "en" ? "Back to website" : "Retour au site"}</Link>
      </header>
      <main className="legal-content page-shell">
        <p className="eyebrow">AL MUMAYIZ</p>
        <h1>{title}</h1>
        <p className="legal-updated">{updated}</p>
        {children}
      </main>
    </>
  );
}

export function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return <section><h2>{title}</h2>{children}</section>;
}
