import { notFound } from "next/navigation";
import { LegalPage, LegalSection } from "@/components/legal-page";
import { isLocale } from "@/lib/i18n";
import { getLegalDetails } from "@/lib/legal";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return { title: copy[lang].title, robots: { index: false, follow: false } };
}

const copy = {
  fr: { title: "Mentions légales", updated: "Dernière mise à jour : 28 juin 2026", editor: "Éditeur du site", form: "Forme juridique", address: "Siège social", registration: "Immatriculation", email: "E-mail", phone: "Téléphone", director: "Directeur de la publication", host: "Hébergement", intellectual: "Propriété intellectuelle", intellectualBody: "Les textes, photographies, logos, graphismes et autres éléments de ce site sont protégés. Toute reproduction ou utilisation sans autorisation écrite préalable est interdite.", liability: "Responsabilité", liabilityBody: "AL MUMAYIZ s’efforce de fournir des informations exactes et à jour. Ces informations sont indicatives et peuvent évoluer. Les liens externes sont fournis à titre pratique et restent sous la responsabilité de leurs éditeurs." },
  en: { title: "Legal notice", updated: "Last updated: June 28, 2026", editor: "Website publisher", form: "Legal form", address: "Registered office", registration: "Registration", email: "Email", phone: "Phone", director: "Publication director", host: "Hosting", intellectual: "Intellectual property", intellectualBody: "The texts, photographs, logos, graphics and other elements of this website are protected. Reproduction or use without prior written permission is prohibited.", liability: "Liability", liabilityBody: "AL MUMAYIZ endeavours to provide accurate and current information. This information is indicative and may change. External links are provided for convenience and remain under their publishers’ responsibility." },
  ar: { title: "الإشعار القانوني", updated: "آخر تحديث: 28 يونيو 2026", editor: "ناشر الموقع", form: "الشكل القانوني", address: "المقر المسجل", registration: "رقم التسجيل", email: "البريد الإلكتروني", phone: "الهاتف", director: "مدير النشر", host: "الاستضافة", intellectual: "الملكية الفكرية", intellectualBody: "النصوص والصور والشعارات والرسومات والعناصر الأخرى في هذا الموقع محمية. يُحظر نسخها أو استخدامها دون إذن كتابي مسبق.", liability: "المسؤولية", liabilityBody: "تسعى المميز إلى تقديم معلومات دقيقة وحديثة، لكنها معلومات إرشادية قابلة للتغيير. الروابط الخارجية مقدمة للتسهيل وتبقى تحت مسؤولية ناشريها." },
};

export default async function LegalNoticePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = copy[lang];
  const legal = getLegalDetails();
  return <LegalPage locale={lang} title={t.title} updated={t.updated}>
    <LegalSection title={t.editor}><dl><dt>{t.form}</dt><dd>{legal.entityName} — {legal.legalForm}</dd><dt>{t.address}</dt><dd>{legal.address}</dd><dt>{t.registration}</dt><dd>{legal.registration}</dd><dt>{t.email}</dt><dd><a href={`mailto:${legal.email}`}>{legal.email}</a></dd><dt>{t.phone}</dt><dd>{legal.phone}</dd></dl></LegalSection>
    <LegalSection title={t.director}><p>{legal.director}</p></LegalSection>
    <LegalSection title={t.host}><p>{legal.hostName}<br />{legal.hostAddress}</p></LegalSection>
    <LegalSection title={t.intellectual}><p>{t.intellectualBody}</p></LegalSection>
    <LegalSection title={t.liability}><p>{t.liabilityBody}</p></LegalSection>
  </LegalPage>;
}
