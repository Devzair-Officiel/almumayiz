import type { Dictionary } from "./types";
import { sharedImages } from "./types";

const fr: Dictionary = {
  localeName: "Français", direction: "ltr",
  metadata: {
    title: "Chéchia en gros | Fabricant AL MUMAYIZ",
    description: "Fabricant et grossiste de chéchias pour homme en Égypte. Prix d'usine, personnalisation OEM et export international.",
  },
  nav: { products: "Produits", factory: "Notre usine", why: "Pourquoi nous", process: "Processus", faq: "FAQ", blog: "Blog", quote: "Demander un devis", about: "À propos" },
  topbar: "Commande minimum 100 pièces · Production en usine — Égypte",
  hero: {
    eyebrow: "Grossiste & fabricant de chéchias", before: "La chéchia ", accent: "en gros", after: ", directement de notre usine.",
    body: "AL MUMAYIZ fabrique et exporte des chéchias pour homme en grande quantité depuis l'Égypte. Qualité artisanale, capacité élevée et prix d'usine pour les professionnels.",
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
      { title: "Prix d'usine", body: "Fabricant direct, sans intermédiaire, pour optimiser vos marges B2B." },
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
    { title: "Expédition", body: "Votre commande est préparée pour l'export et livrée." },
  ] },
  seo: { title: "Votre grossiste en chéchia de confiance", body: "AL MUMAYIZ fournit boutiques, importateurs et distributeurs en chéchias homme tricotées. En tant que fabricant direct, nous garantissons qualité, capacité et régularité sur chaque commande en gros." },
  form: {
    title: "Demandez votre devis en gros", body: "Indiquez les modèles et quantités recherchés. Notre équipe étudiera votre demande.", response: "Réponse sous 24 à 48 h", direct: "Vous préférez parler directement ?", directBody: "Écrivez-nous sur WhatsApp pour une réponse rapide.", whatsapp: "Ouvrir WhatsApp",
    fields: { name: "Nom complet", company: "Société", country: "Pays", email: "E-mail", phone: "Téléphone / WhatsApp", product: "Modèle(s) souhaité(s)", quantity: "Quantité estimée", message: "Votre message" },
    productOptions: [{ value: "beige", label: "Chéchia beige" }, { value: "olive", label: "Chéchia olive" }, { value: "black", label: "Chéchia noire" }, { value: "mixed", label: "Assortiment de modèles" }, { value: "oem", label: "Personnalisation OEM / marque blanche" }],
    quantityOptions: [{ value: "100", label: "100 pièces" }, { value: "250", label: "250 pièces" }, { value: "500", label: "500 pièces" }, { value: "1000", label: "1 000 pièces" }, { value: "2500", label: "2 500 pièces" }, { value: "5000+", label: "5 000 pièces ou plus" }],
    selectPlaceholder: "Sélectionner", privacyNotice: "En envoyant ce formulaire, vous acceptez que vos informations soient utilisées pour traiter votre demande de devis.", privacyLink: "Politique de confidentialité",
    submit: "Envoyer la demande", pending: "Envoi en cours…", success: "Merci ! Votre demande a été enregistrée et envoyée.", error: "Impossible de traiter la demande.", errorValidation: "Vérifiez les champs obligatoires.", errorDatabase: "La demande n'a pas pu être enregistrée. Réessayez plus tard.", errorEmail: "La demande est enregistrée, mais l'e-mail n'a pas pu être envoyé. Nous la traiterons dès que possible.", errorCaptcha: "La vérification anti-robot a échoué. Actualisez-la puis réessayez.", errorRateLimit: "Trop de demandes ont été envoyées. Réessayez dans une heure.",
  },
  faq: { title: "Questions fréquentes", items: [
    { question: "Quelle est la commande minimum ?", answer: "La commande minimum est de 100 pièces par modèle." },
    { question: "Livrez-vous à l'international ?", answer: "Oui, nous exportons dans le monde entier avec les documents adaptés." },
    { question: "Quels sont les délais de production ?", answer: "Ils varient selon le volume et la personnalisation et sont confirmés avec le devis." },
    { question: "Puis-je recevoir un échantillon ?", answer: "Oui, un échantillon peut être préparé afin de valider la qualité avant commande." },
  ] },
  footer: { tagline: "Fabricant & grossiste de chéchias, basé en Égypte.", rights: "Tous droits réservés.", legal: "Mentions légales", privacy: "Confidentialité" },
  about: {
    eyebrow: "À propos d'AL MUMAYIZ", title: "Le spécialiste de la chéchia en gros",
    sub: "AL MUMAYIZ est un fabricant et grossiste de chéchias pour homme, basé en Égypte. Nous fournissons grossistes, détaillants et distributeurs partout dans le monde, directement depuis notre usine.",
    storyEyebrow: "Notre histoire", storyTitle: "Du fil à la chéchia, sous un même toit",
    storyP1: "Spécialisés dans la chéchia depuis nos débuts, nous avons bâti une usine intégrée en Égypte qui maîtrise chaque étape : tricotage, broderie, contrôle qualité et conditionnement.",
    storyP2: "Cette maîtrise complète nous permet d'offrir des prix d'usine, une qualité constante et une capacité de production adaptée aux commandes en gros, du premier carton jusqu'au conteneur.",
    mission: "Offrir aux professionnels une chéchia de qualité, en grande quantité et à prix juste, directement du fabricant.",
    valuesEyebrow: "Nos valeurs", valuesTitle: "Ce qui nous guide",
    values: [
      { title: "Qualité", body: "Un coton sélectionné et un contrôle à chaque étape pour une finition irréprochable sur chaque pièce." },
      { title: "Capacité", body: "Une usine intégrée, dimensionnée pour les commandes en gros et le respect de vos délais." },
      { title: "Confiance", body: "Un partenaire B2B fiable, transparent et engagé sur le long terme." },
    ],
    ctaTitle: "Travaillons ensemble", ctaSub: "Vous cherchez un fournisseur fiable de chéchia en gros ? Parlons de votre projet et recevez votre devis.",
  },
};

export default fr;
