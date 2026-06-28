import "server-only";

export const locales = ["fr", "en", "ar"] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export type Dictionary = {
  localeName: string;
  direction: "ltr" | "rtl";
  metadata: { title: string; description: string };
  nav: { products: string; factory: string; why: string; process: string; faq: string; quote: string };
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
};

const sharedImages = [
  "/images/products/beige.png",
  "/images/products/olive.png",
  "/images/products/black.png",
];

const dictionaries: Record<Locale, Dictionary> = {
  fr: {
    localeName: "Français", direction: "ltr",
    metadata: {
      title: "Chéchia en gros | Fabricant AL MUMAYIZ",
      description: "Fabricant et grossiste de chéchias pour homme en Égypte. Prix d’usine, personnalisation OEM et export international.",
    },
    nav: { products: "Produits", factory: "Notre usine", why: "Pourquoi nous", process: "Processus", faq: "FAQ", quote: "Demander un devis" },
    topbar: "Commande minimum 100 pièces · Production en usine — Égypte",
    hero: {
      eyebrow: "Grossiste & fabricant de chéchias", before: "La chéchia ", accent: "en gros", after: ", directement de notre usine.",
      body: "AL MUMAYIZ fabrique et exporte des chéchias pour homme en grande quantité depuis l’Égypte. Qualité artisanale, capacité élevée et prix d’usine pour les professionnels.",
      quote: "Demander un devis en gros", whatsapp: "Discuter sur WhatsApp",
    },
    stats: [{ value: "20K+", label: "pièces / mois" }, { value: "100", label: "commande minimum" }, { value: "10", label: "pays livrés" }],
    markets: { title: "Nous livrons les professionnels du monde entier", items: ["France & Europe", "Maghreb", "Moyen-Orient & Golfe", "Afrique", "International"] },
    products: {
      eyebrow: "Notre gamme", title: "Chéchias tricotées, en gros", body: "Des modèles homme en maille de coton aux finitions brodées, disponibles en plusieurs coloris, tailles et quantités.", minimum: "Commande minimum : 100 pièces par modèle.",
      items: [
        { name: "Chéchia Beige", description: "Maille naturelle et bandeau crème délicat.", image: sharedImages[0] },
        { name: "Chéchia Olive", description: "Maille ajourée et bandeau brodé en zigzag.", image: sharedImages[1] },
        { name: "Chéchia Noire", description: "Coton noir et motif grec brodé.", image: sharedImages[2] },
      ],
      customTitle: "Personnalisation OEM", customBody: "Vos coloris, vos étiquettes et vos emballages. Marque blanche disponible sur demande.",
    },
    why: {
      eyebrow: "Pourquoi AL MUMAYIZ", title: "Le partenaire de votre approvisionnement",
      items: [
        { title: "Capacité de production", body: "Une usine intégrée capable de produire en grands volumes et de tenir vos délais." },
        { title: "Prix d’usine", body: "Fabricant direct, sans intermédiaire, pour optimiser vos marges B2B." },
        { title: "Qualité constante", body: "Coton sélectionné et contrôle qualité à chaque étape de fabrication." },
        { title: "Export mondial", body: "Expédition en colis ou conteneur et accompagnement documentaire." },
        { title: "Personnalisation", body: "Coloris, tailles, broderies, étiquetage et marque blanche." },
        { title: "MOQ accessible", body: "À partir de 100 pièces pour tester un modèle avant de monter en volume." },
      ],
    },
    factory: {
      eyebrow: "Notre usine", title: "AL MUMAYIZ, fabriqué en Égypte", body: "Notre usine maîtrise toute la chaîne, du fil à la chéchia finie. Tricotage, broderie, contrôle qualité et conditionnement sont réunis sous un même toit.",
      stats: [{ value: "20K+", label: "pièces / mois" }, { value: "15+", label: "ans de savoir-faire" }, { value: "30+", label: "collaborateurs" }, { value: "10", label: "pays exportés" }],
    },
    process: { title: "De la demande à la livraison", items: [
      { title: "Demande de devis", body: "Envoyez-nous vos modèles, coloris et quantités." },
      { title: "Échantillon", body: "Validez la qualité avant la mise en production." },
      { title: "Production", body: "Nous fabriquons selon le cahier des charges validé." },
      { title: "Expédition", body: "Votre commande est préparée pour l’export et livrée." },
    ] },
    seo: { title: "Votre grossiste en chéchia de confiance", body: "AL MUMAYIZ fournit boutiques, importateurs et distributeurs en chéchias homme tricotées. En tant que fabricant direct, nous garantissons qualité, capacité et régularité sur chaque commande en gros." },
    form: {
      title: "Demandez votre devis en gros", body: "Indiquez les modèles et quantités recherchés. Notre équipe étudiera votre demande.", response: "Réponse sous 24 à 48 h", direct: "Vous préférez parler directement ?", directBody: "Écrivez-nous sur WhatsApp pour une réponse rapide.", whatsapp: "Ouvrir WhatsApp",
      fields: { name: "Nom complet", company: "Société", country: "Pays", email: "E-mail", phone: "Téléphone / WhatsApp", product: "Modèle(s) souhaité(s)", quantity: "Quantité estimée", message: "Votre message" },
      productOptions: [{ value: "beige", label: "Chéchia beige" }, { value: "olive", label: "Chéchia olive" }, { value: "black", label: "Chéchia noire" }, { value: "mixed", label: "Assortiment de modèles" }, { value: "oem", label: "Personnalisation OEM / marque blanche" }],
      quantityOptions: [{ value: "100", label: "100 pièces" }, { value: "250", label: "250 pièces" }, { value: "500", label: "500 pièces" }, { value: "1000", label: "1 000 pièces" }, { value: "2500", label: "2 500 pièces" }, { value: "5000+", label: "5 000 pièces ou plus" }],
      selectPlaceholder: "Sélectionner", privacyNotice: "En envoyant ce formulaire, vous acceptez que vos informations soient utilisées pour traiter votre demande de devis.", privacyLink: "Politique de confidentialité",
      submit: "Envoyer la demande", pending: "Envoi en cours…", success: "Merci ! Votre demande a été enregistrée et envoyée.", error: "Impossible de traiter la demande.", errorValidation: "Vérifiez les champs obligatoires.", errorDatabase: "La demande n’a pas pu être enregistrée. Réessayez plus tard.", errorEmail: "La demande est enregistrée, mais l’e-mail n’a pas pu être envoyé. Nous la traiterons dès que possible.", errorCaptcha: "La vérification anti-robot a échoué. Actualisez-la puis réessayez.", errorRateLimit: "Trop de demandes ont été envoyées. Réessayez dans une heure.",
    },
    faq: { title: "Questions fréquentes", items: [
      { question: "Quelle est la commande minimum ?", answer: "La commande minimum est de 100 pièces par modèle." },
      { question: "Livrez-vous à l’international ?", answer: "Oui, nous exportons dans le monde entier avec les documents adaptés." },
      { question: "Quels sont les délais de production ?", answer: "Ils varient selon le volume et la personnalisation et sont confirmés avec le devis." },
      { question: "Puis-je recevoir un échantillon ?", answer: "Oui, un échantillon peut être préparé afin de valider la qualité avant commande." },
    ] },
    footer: { tagline: "Fabricant & grossiste de chéchias, basé en Égypte.", rights: "Tous droits réservés.", legal: "Mentions légales", privacy: "Confidentialité" },
  },
  en: {
    localeName: "English", direction: "ltr",
    metadata: { title: "Wholesale Chechia | AL MUMAYIZ Manufacturer", description: "Men’s chechia manufacturer and wholesaler in Egypt. Factory prices, OEM customization and worldwide export." },
    nav: { products: "Products", factory: "Our factory", why: "Why us", process: "Process", faq: "FAQ", quote: "Request a quote" },
    topbar: "Minimum order 100 pieces · Factory production — Egypt",
    hero: { eyebrow: "Chechia wholesaler & manufacturer", before: "Wholesale ", accent: "chechia", after: ", straight from our factory.", body: "AL MUMAYIZ manufactures and exports men’s chechia caps in large quantities from Egypt. Craft quality, high capacity and factory prices for professionals.", quote: "Request a wholesale quote", whatsapp: "Chat on WhatsApp" },
    stats: [{ value: "20K+", label: "pieces / month" }, { value: "100", label: "minimum order" }, { value: "10", label: "countries supplied" }],
    markets: { title: "We supply professionals worldwide", items: ["France & Europe", "Maghreb", "Middle East & Gulf", "Africa", "Worldwide"] },
    products: { eyebrow: "Our range", title: "Wholesale knitted chechia", body: "Men’s cotton-knit styles with embroidered finishes, available in several colours, sizes and quantities.", minimum: "Minimum order: 100 pieces per style.", items: [
      { name: "Beige Chechia", description: "Natural knit with a delicate cream band.", image: sharedImages[0] },
      { name: "Olive Chechia", description: "Openwork knit with an embroidered zigzag band.", image: sharedImages[1] },
      { name: "Black Chechia", description: "Black cotton with an embroidered Greek motif.", image: sharedImages[2] },
    ], customTitle: "OEM customization", customBody: "Your colours, labels and packaging. White-label production available on request." },
    why: { eyebrow: "Why AL MUMAYIZ", title: "Your reliable sourcing partner", items: [
      { title: "Production capacity", body: "An integrated factory built for high-volume, on-time production." },
      { title: "Factory prices", body: "Direct manufacturing with no middlemen, protecting your margins." },
      { title: "Consistent quality", body: "Selected cotton and quality control throughout manufacturing." },
      { title: "Worldwide export", body: "Parcel or container shipping with export documentation support." },
      { title: "Customization", body: "Colours, sizes, embroidery, labels and white-label options." },
      { title: "Accessible MOQ", body: "Start from 100 pieces per style before scaling your order." },
    ] },
    factory: { eyebrow: "Our factory", title: "AL MUMAYIZ, made in Egypt", body: "Our factory controls the complete chain from yarn to finished chechia. Knitting, embroidery, quality control and packaging all happen under one roof.", stats: [{ value: "20K+", label: "pieces / month" }, { value: "15+", label: "years of expertise" }, { value: "30+", label: "team members" }, { value: "10", label: "export countries" }] },
    process: { title: "From enquiry to delivery", items: [
      { title: "Quote request", body: "Tell us the styles, colours and quantities you need." }, { title: "Sample", body: "Approve product quality before mass production." }, { title: "Production", body: "We manufacture to the approved specifications." }, { title: "Shipping", body: "Your order is export-ready and delivered to you." },
    ] },
    seo: { title: "Your trusted chechia wholesaler", body: "AL MUMAYIZ supplies retailers, importers and distributors with knitted men’s chechia. As a direct manufacturer, we deliver quality, capacity and consistency for every wholesale order." },
    form: { title: "Request your wholesale quote", body: "Tell us which products and quantities you need. Our team will review your request.", response: "Reply within 24–48 hours", direct: "Prefer to speak directly?", directBody: "Message us on WhatsApp for a quick reply.", whatsapp: "Open WhatsApp", fields: { name: "Full name", company: "Company", country: "Country", email: "Email", phone: "Phone / WhatsApp", product: "Product(s) of interest", quantity: "Estimated quantity", message: "Your message" }, productOptions: [{ value: "beige", label: "Beige chechia" }, { value: "olive", label: "Olive chechia" }, { value: "black", label: "Black chechia" }, { value: "mixed", label: "Mixed styles" }, { value: "oem", label: "OEM / white-label customization" }], quantityOptions: [{ value: "100", label: "100 pieces" }, { value: "250", label: "250 pieces" }, { value: "500", label: "500 pieces" }, { value: "1000", label: "1,000 pieces" }, { value: "2500", label: "2,500 pieces" }, { value: "5000+", label: "5,000 pieces or more" }], selectPlaceholder: "Select an option", privacyNotice: "By sending this form, you agree that your information may be used to process your quote request.", privacyLink: "Privacy policy", submit: "Send request", pending: "Sending…", success: "Thank you! Your request has been saved and emailed.", error: "We could not process your request.", errorValidation: "Check the required fields.", errorDatabase: "Your request could not be saved. Please try again later.", errorEmail: "Your request is saved, but the email could not be sent. We will process it as soon as possible.", errorCaptcha: "The anti-bot check failed. Refresh it and try again.", errorRateLimit: "Too many requests were sent. Please try again in one hour." },
    faq: { title: "Frequently asked questions", items: [
      { question: "What is the minimum order?", answer: "The minimum order is 100 pieces per style." }, { question: "Do you ship internationally?", answer: "Yes, we export worldwide with the required documentation." }, { question: "What are your production lead times?", answer: "Lead times depend on volume and customization and are confirmed with your quote." }, { question: "Can I receive a sample?", answer: "Yes, a sample can be prepared to approve quality before ordering." },
    ] },
    footer: { tagline: "Chechia manufacturer & wholesaler, based in Egypt.", rights: "All rights reserved.", legal: "Legal notice", privacy: "Privacy" },
  },
  ar: {
    localeName: "العربية", direction: "rtl",
    metadata: { title: "الشاشية بالجملة | مصنع المميز", description: "مصنع وتاجر جملة للشاشيات الرجالية في مصر، مع أسعار المصنع والتخصيص والتصدير إلى جميع أنحاء العالم." },
    nav: { products: "المنتجات", factory: "مصنعنا", why: "لماذا نحن", process: "آلية العمل", faq: "الأسئلة الشائعة", quote: "اطلب عرض سعر" },
    topbar: "الحد الأدنى للطلب 100 قطعة · إنتاج مصنعي — مصر",
    hero: { eyebrow: "مصنع وتاجر جملة للشاشيات", before: "الشاشية ", accent: "بالجملة", after: "، مباشرة من مصنعنا.", body: "تصنّع المميز وتصدّر الشاشيات الرجالية بكميات كبيرة من مصر، بجودة حرفية وطاقة إنتاجية عالية وأسعار مصنع للمحترفين.", quote: "اطلب عرض سعر بالجملة", whatsapp: "تواصل عبر واتساب" },
    stats: [{ value: "+20 ألف", label: "قطعة / شهرياً" }, { value: "100", label: "حد أدنى للطلب" }, { value: "10", label: "دول للتصدير" }],
    markets: { title: "نزوّد المحترفين حول العالم", items: ["فرنسا وأوروبا", "المغرب العربي", "الشرق الأوسط والخليج", "أفريقيا", "دولياً"] },
    products: { eyebrow: "تشكيلتنا", title: "شاشيات محبوكة بالجملة", body: "موديلات رجالية من القطن المحبوك بلمسات مطرزة، متوفرة بعدة ألوان ومقاسات وكميات.", minimum: "الحد الأدنى للطلب: 100 قطعة لكل موديل.", items: [
      { name: "شاشية بيج", description: "حياكة طبيعية بشريط كريمي أنيق.", image: sharedImages[0] }, { name: "شاشية زيتية", description: "حياكة مفتوحة بشريط مطرز متعرج.", image: sharedImages[1] }, { name: "شاشية سوداء", description: "قطن أسود بزخرفة مطرزة.", image: sharedImages[2] },
    ], customTitle: "تخصيص OEM", customBody: "ألوانك وملصقاتك وتغليفك، مع خدمة العلامة البيضاء عند الطلب." },
    why: { eyebrow: "لماذا المميز", title: "شريك موثوق لتوريد منتجاتك", items: [
      { title: "طاقة إنتاجية", body: "مصنع متكامل للإنتاج بكميات كبيرة وفي المواعيد المحددة." }, { title: "أسعار المصنع", body: "تصنيع مباشر من دون وسطاء لحماية هامش ربحك." }, { title: "جودة ثابتة", body: "قطن منتقى ورقابة جودة في جميع مراحل التصنيع." }, { title: "تصدير عالمي", body: "شحن بالطرود أو الحاويات مع دعم مستندات التصدير." }, { title: "تخصيص", body: "ألوان ومقاسات وتطريز وملصقات وعلامة بيضاء." }, { title: "حد أدنى مرن", body: "ابدأ من 100 قطعة لكل موديل ثم ارفع حجم طلبك." },
    ] },
    factory: { eyebrow: "مصنعنا", title: "المميز، صناعة مصرية", body: "يسيطر مصنعنا على السلسلة كاملة من الخيط حتى الشاشية الجاهزة. تتم الحياكة والتطريز ومراقبة الجودة والتغليف تحت سقف واحد.", stats: [{ value: "+20 ألف", label: "قطعة / شهرياً" }, { value: "+15", label: "عاماً من الخبرة" }, { value: "+30", label: "موظفاً" }, { value: "10", label: "دول للتصدير" }] },
    process: { title: "من الطلب إلى التسليم", items: [
      { title: "طلب عرض سعر", body: "أخبرنا بالموديلات والألوان والكميات المطلوبة." }, { title: "العينة", body: "اعتمد جودة المنتج قبل بدء الإنتاج." }, { title: "الإنتاج", body: "نصنّع وفق المواصفات التي تم اعتمادها." }, { title: "الشحن", body: "نجهز طلبك للتصدير ونسلمه إليك." },
    ] },
    seo: { title: "تاجر الجملة الموثوق للشاشيات", body: "تزوّد المميز المتاجر والمستوردين والموزعين بالشاشيات الرجالية المحبوكة. وبصفتنا مصنعاً مباشراً نضمن الجودة والطاقة والانتظام في كل طلب جملة." },
    form: { title: "اطلب عرض سعر بالجملة", body: "أخبرنا بالمنتجات والكميات المطلوبة وسيدرس فريقنا طلبك.", response: "نرد خلال 24 إلى 48 ساعة", direct: "تفضل التواصل المباشر؟", directBody: "راسلنا عبر واتساب للحصول على رد سريع.", whatsapp: "افتح واتساب", fields: { name: "الاسم الكامل", company: "الشركة", country: "الدولة", email: "البريد الإلكتروني", phone: "الهاتف / واتساب", product: "الموديلات المطلوبة", quantity: "الكمية التقديرية", message: "رسالتك" }, productOptions: [{ value: "beige", label: "شاشية بيج" }, { value: "olive", label: "شاشية زيتية" }, { value: "black", label: "شاشية سوداء" }, { value: "mixed", label: "تشكيلة موديلات" }, { value: "oem", label: "تخصيص وعلامة بيضاء" }], quantityOptions: [{ value: "100", label: "100 قطعة" }, { value: "250", label: "250 قطعة" }, { value: "500", label: "500 قطعة" }, { value: "1000", label: "1,000 قطعة" }, { value: "2500", label: "2,500 قطعة" }, { value: "5000+", label: "5,000 قطعة أو أكثر" }], selectPlaceholder: "اختر", privacyNotice: "بإرسال هذا النموذج، توافق على استخدام معلوماتك لمعالجة طلب عرض السعر.", privacyLink: "سياسة الخصوصية", submit: "إرسال الطلب", pending: "جارٍ الإرسال…", success: "شكراً! تم تسجيل طلبك وإرساله بنجاح.", error: "تعذر معالجة الطلب.", errorValidation: "تحقق من الحقول المطلوبة.", errorDatabase: "تعذر حفظ الطلب. حاول مرة أخرى لاحقاً.", errorEmail: "تم حفظ الطلب، لكن تعذر إرسال البريد. سنعالجه في أقرب وقت.", errorCaptcha: "فشل التحقق من مكافحة الروبوت. حدّثه وحاول مجدداً.", errorRateLimit: "تم إرسال طلبات كثيرة. حاول مجدداً بعد ساعة." },
    faq: { title: "الأسئلة الشائعة", items: [
      { question: "ما الحد الأدنى للطلب؟", answer: "الحد الأدنى هو 100 قطعة لكل موديل." }, { question: "هل تشحنون دولياً؟", answer: "نعم، نصدر إلى جميع أنحاء العالم مع المستندات المطلوبة." }, { question: "ما مدة الإنتاج؟", answer: "تعتمد على الكمية والتخصيص ويتم تأكيدها مع عرض السعر." }, { question: "هل يمكنني الحصول على عينة؟", answer: "نعم، يمكن إعداد عينة لاعتماد الجودة قبل الطلب." },
    ] },
    footer: { tagline: "مصنع وتاجر جملة للشاشيات، مقرنا في مصر.", rights: "جميع الحقوق محفوظة.", legal: "الإشعار القانوني", privacy: "الخصوصية" },
  },
};

export async function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
