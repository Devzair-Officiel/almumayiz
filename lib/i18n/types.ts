export const locales = ["fr", "en", "ar"] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export type Dictionary = {
  localeName: string;
  direction: "ltr" | "rtl";
  metadata: { title: string; description: string };
  nav: { products: string; factory: string; why: string; process: string; faq: string; blog: string; quote: string; about: string };
  topbar: string;
  hero: { eyebrow: string; before: string; accent: string; after: string; body: string; quote: string; whatsapp: string };
  stats: Array<{ value: string; label: string }>;
  markets: { title: string; items: string[] };
  products: {
    eyebrow: string; title: string; body: string; minimum: string;
    items: Array<{ name: string; description: string; image: string }>;
    customTitle: string; customBody: string;
  };
  why: { eyebrow: string; title: string; items: Array<{ title: string; body: string }> };
  factory: { eyebrow: string; title: string; body: string; stats: Array<{ value: string; label: string }> };
  process: { title: string; items: Array<{ title: string; body: string }> };
  seo: { title: string; body: string };
  form: {
    title: string; body: string; response: string; direct: string; directBody: string; whatsapp: string;
    fields: { name: string; company: string; country: string; email: string; phone: string; product: string; quantity: string; message: string };
    productOptions: Array<{ value: string; label: string }>;
    quantityOptions: Array<{ value: string; label: string }>;
    selectPlaceholder: string; privacyNotice: string; privacyLink: string;
    submit: string; pending: string; success: string; error: string; errorValidation: string; errorDatabase: string; errorEmail: string; errorCaptcha: string; errorRateLimit: string;
  };
  faq: { title: string; items: Array<{ question: string; answer: string }> };
  footer: { tagline: string; rights: string; legal: string; privacy: string };
  about: {
    eyebrow: string; title: string; sub: string;
    storyEyebrow: string; storyTitle: string; storyP1: string; storyP2: string;
    mission: string;
    valuesEyebrow: string; valuesTitle: string; values: Array<{ title: string; body: string }>;
    ctaTitle: string; ctaSub: string;
  };
};

export const sharedImages = [
  "/images/products/beige.webp",
  "/images/products/olive.webp",
  "/images/products/black.webp",
];
