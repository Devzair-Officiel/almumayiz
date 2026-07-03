import { notFound } from "next/navigation";
import { LegalPage, LegalSection } from "@/components/legal-page";
import { isLocale } from "@/lib/i18n";
import { getLegalDetails } from "@/lib/legal";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return {
    title: copy[lang].title,
    alternates: { canonical: `/${lang}/confidentialite` },
    robots: { index: false, follow: true },
  };
}

const copy = {
  fr: { title: "Politique de confidentialité", updated: "Dernière mise à jour : 28 juin 2026", controller: "Responsable du traitement", controllerBody: "Le responsable du traitement est", data: "Données collectées", dataBody: "Le formulaire de devis collecte les nom, société, pays, adresse e-mail, téléphone, produits, quantité et message que vous fournissez. Une empreinte non réversible de l’adresse IP est conservée temporairement pour limiter les abus.", purpose: "Finalités et base juridique", purposeBody: "Les données sont utilisées uniquement pour répondre à votre demande, préparer un devis, assurer le suivi commercial demandé et sécuriser le formulaire. Le traitement repose sur les mesures précontractuelles prises à votre demande et sur l’intérêt légitime de sécuriser le service.", recipients: "Destinataires", recipientsBody: "Les données sont accessibles aux personnes habilitées chez AL MUMAYIZ et à ses prestataires techniques strictement nécessaires : hébergement, base de données, messagerie OVH et protection anti-robot Cloudflare Turnstile.", retention: "Durée de conservation", retentionBody: "Les demandes de prospects sont conservées au maximum trois ans après leur collecte ou le dernier contact de leur part, sauf obligation légale ou nécessité de défendre un droit.", rights: "Vos droits", rightsBody: "Vous pouvez demander l’accès, la rectification, l’effacement, la limitation ou l’opposition au traitement de vos données. Vous pouvez également saisir l’autorité de protection des données compétente.", contact: "Exercer vos droits", transfer: "Transferts et sécurité", transferBody: "Des mesures techniques et organisationnelles protègent les données. Turnstile peut traiter des données techniques nécessaires à la détection des abus conformément à la politique de Cloudflare." },
  en: { title: "Privacy policy", updated: "Last updated: June 28, 2026", controller: "Data controller", controllerBody: "The data controller is", data: "Data collected", dataBody: "The quote form collects the name, company, country, email address, phone, products, quantity and message you provide. A non-reversible fingerprint of the IP address is temporarily stored to limit abuse.", purpose: "Purposes and legal basis", purposeBody: "Data is used only to answer your request, prepare a quote, provide the requested commercial follow-up and secure the form. Processing is based on pre-contractual steps requested by you and the legitimate interest of securing the service.", recipients: "Recipients", recipientsBody: "Data is available to authorized AL MUMAYIZ staff and strictly necessary technical providers: hosting, database, OVH email and Cloudflare Turnstile anti-bot protection.", retention: "Retention period", retentionBody: "Prospect requests are retained for no longer than three years after collection or the last contact from the prospect, unless a legal obligation or legal claim requires otherwise.", rights: "Your rights", rightsBody: "You may request access, correction, deletion, restriction or object to processing. You may also contact the competent data protection authority.", contact: "Exercise your rights", transfer: "Transfers and security", transferBody: "Technical and organizational measures protect the data. Turnstile may process technical data required to detect abuse in accordance with Cloudflare’s policy." },
  ar: { title: "سياسة الخصوصية", updated: "آخر تحديث: 28 يونيو 2026", controller: "مسؤول معالجة البيانات", controllerBody: "مسؤول معالجة البيانات هو", data: "البيانات التي نجمعها", dataBody: "يجمع نموذج عرض السعر الاسم والشركة والدولة والبريد والهاتف والمنتجات والكمية والرسالة التي تقدمها. تُحفظ بصمة غير قابلة للعكس لعنوان IP مؤقتاً للحد من إساءة الاستخدام.", purpose: "الأغراض والأساس القانوني", purposeBody: "تُستخدم البيانات للرد على طلبك وإعداد عرض السعر والمتابعة التجارية المطلوبة وتأمين النموذج. تستند المعالجة إلى الإجراءات السابقة للتعاقد بطلبك والمصلحة المشروعة في حماية الخدمة.", recipients: "المستلمون", recipientsBody: "يمكن للموظفين المخولين في المميز ومقدمي الخدمات الضروريين الوصول إلى البيانات: الاستضافة وقاعدة البيانات وبريد OVH وحماية Cloudflare Turnstile.", retention: "مدة الاحتفاظ", retentionBody: "تُحفظ طلبات العملاء المحتملين لمدة لا تتجاوز ثلاث سنوات من جمعها أو آخر تواصل منهم، ما لم يفرض القانون أو الدفاع عن الحقوق مدة أخرى.", rights: "حقوقك", rightsBody: "يمكنك طلب الوصول إلى بياناتك أو تصحيحها أو حذفها أو تقييد معالجتها أو الاعتراض عليها، كما يمكنك التواصل مع سلطة حماية البيانات المختصة.", contact: "ممارسة حقوقك", transfer: "النقل والأمان", transferBody: "نطبق تدابير تقنية وتنظيمية لحماية البيانات. قد تعالج Turnstile بيانات تقنية ضرورية لكشف إساءة الاستخدام وفقاً لسياسة Cloudflare." },
};

export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = copy[lang];
  const legal = getLegalDetails();
  return <LegalPage locale={lang} title={t.title} updated={t.updated}>
    <LegalSection title={t.controller}><p>{t.controllerBody} {legal.entityName}, {legal.address}. Contact : <a href={`mailto:${legal.email}`}>{legal.email}</a>.</p></LegalSection>
    <LegalSection title={t.data}><p>{t.dataBody}</p></LegalSection>
    <LegalSection title={t.purpose}><p>{t.purposeBody}</p></LegalSection>
    <LegalSection title={t.recipients}><p>{t.recipientsBody}</p></LegalSection>
    <LegalSection title={t.retention}><p>{t.retentionBody}</p></LegalSection>
    <LegalSection title={t.rights}><p>{t.rightsBody}</p></LegalSection>
    <LegalSection title={t.contact}><p><a href={`mailto:${legal.email}`}>{legal.email}</a></p></LegalSection>
    <LegalSection title={t.transfer}><p>{t.transferBody}</p></LegalSection>
  </LegalPage>;
}
