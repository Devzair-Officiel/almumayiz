import type { Locale } from "@/lib/i18n";

export const blogCopy: Record<Locale, {
  blog: string; home: string; contact: string; title: string; intro: string; empty: string;
  read: string; minutes: string; published: string; updated: string; related: string; back: string;
}> = {
  fr: { blog: "Blog", home: "Accueil", contact: "Demander un devis", title: "Conseils & expertise chéchia", intro: "Guides pratiques pour grossistes, boutiques, importateurs et distributeurs.", empty: "Les premiers articles sont en préparation.", read: "Lire l’article", minutes: "min de lecture", published: "Publié le", updated: "Mis à jour le", related: "À lire également", back: "Retour au blog" },
  en: { blog: "Blog", home: "Home", contact: "Request a quote", title: "Chechia insights & expertise", intro: "Practical guides for wholesalers, retailers, importers and distributors.", empty: "The first articles are being prepared.", read: "Read article", minutes: "min read", published: "Published on", updated: "Updated on", related: "Related articles", back: "Back to blog" },
  ar: { blog: "المدونة", home: "الرئيسية", contact: "اطلب عرض سعر", title: "نصائح وخبرة في الشاشية", intro: "أدلة عملية لتجار الجملة والمتاجر والمستوردين والموزعين.", empty: "المقالات الأولى قيد الإعداد.", read: "اقرأ المقال", minutes: "دقائق للقراءة", published: "نُشر في", updated: "حُدث في", related: "مقالات ذات صلة", back: "العودة إلى المدونة" },
};
