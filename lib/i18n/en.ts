import type { Dictionary } from "./types";
import { sharedImages } from "./types";

const en: Dictionary = {
  localeName: "English", direction: "ltr",
  metadata: { title: "Wholesale Chechia | AL MUMAYIZ Manufacturer", description: "Men's chechia manufacturer and wholesaler in Egypt. Factory prices, OEM customization and worldwide export." },
  nav: { products: "Products", factory: "Our factory", why: "Why us", process: "Process", faq: "FAQ", blog: "Blog", quote: "Request a quote", about: "About" },
  topbar: "Minimum order 100 pieces · Factory production — Egypt",
  hero: { eyebrow: "Chechia wholesaler & manufacturer", before: "Wholesale ", accent: "chechia", after: ", straight from our factory.", body: "AL MUMAYIZ manufactures and exports men's chechia caps in large quantities from Egypt. Craft quality, high capacity and factory prices for professionals.", quote: "Request a wholesale quote", whatsapp: "Chat on WhatsApp" },
  stats: [{ value: "20K+", label: "pieces / month" }, { value: "100", label: "minimum order" }, { value: "10", label: "countries supplied" }],
  markets: { title: "We supply professionals worldwide", items: ["France & Europe", "Maghreb", "Middle East & Gulf", "Africa", "Worldwide"] },
  products: {
    eyebrow: "Our range", title: "Wholesale knitted chechia", body: "Men's cotton-knit styles with embroidered finishes, available in several colours, sizes and quantities.", minimum: "Minimum order: 100 pieces per style.",
    items: [
      { name: "Beige Chechia", description: "Natural knit with a delicate cream band.", image: sharedImages[0] },
      { name: "Olive Chechia", description: "Openwork knit with an embroidered zigzag band.", image: sharedImages[1] },
      { name: "Black Chechia", description: "Black cotton with an embroidered Greek motif.", image: sharedImages[2] },
    ],
    customTitle: "OEM customization", customBody: "Your colours, labels and packaging. White-label production available on request.",
  },
  why: {
    eyebrow: "Why AL MUMAYIZ", title: "Your reliable sourcing partner",
    items: [
      { title: "Production capacity", body: "An integrated factory built for high-volume, on-time production." },
      { title: "Factory prices", body: "Direct manufacturing with no middlemen, protecting your margins." },
      { title: "Consistent quality", body: "Selected cotton and quality control throughout manufacturing." },
      { title: "Worldwide export", body: "Parcel or container shipping with export documentation support." },
      { title: "Customization", body: "Colours, sizes, embroidery, labels and white-label options." },
      { title: "Accessible MOQ", body: "Start from 100 pieces per style before scaling your order." },
    ],
  },
  factory: {
    eyebrow: "Our factory", title: "AL MUMAYIZ, made in Egypt", body: "Our factory controls the complete chain from yarn to finished chechia. Knitting, embroidery, quality control and packaging all happen under one roof.",
    stats: [{ value: "20K+", label: "pieces / month" }, { value: "15+", label: "years of expertise" }, { value: "30+", label: "team members" }, { value: "10", label: "export countries" }],
  },
  process: { title: "From enquiry to delivery", items: [
    { title: "Quote request", body: "Tell us the styles, colours and quantities you need." },
    { title: "Sample", body: "Approve product quality before mass production." },
    { title: "Production", body: "We manufacture to the approved specifications." },
    { title: "Shipping", body: "Your order is export-ready and delivered to you." },
  ] },
  seo: { title: "Your trusted chechia wholesaler", body: "AL MUMAYIZ supplies retailers, importers and distributors with knitted men's chechia. As a direct manufacturer, we deliver quality, capacity and consistency for every wholesale order." },
  form: {
    title: "Request your wholesale quote", body: "Tell us which products and quantities you need. Our team will review your request.", response: "Reply within 24–48 hours", direct: "Prefer to speak directly?", directBody: "Message us on WhatsApp for a quick reply.", whatsapp: "Open WhatsApp",
    fields: { name: "Full name", company: "Company", country: "Country", email: "Email", phone: "Phone / WhatsApp", product: "Product(s) of interest", quantity: "Estimated quantity", message: "Your message" },
    productOptions: [{ value: "beige", label: "Beige chechia" }, { value: "olive", label: "Olive chechia" }, { value: "black", label: "Black chechia" }, { value: "mixed", label: "Mixed styles" }, { value: "oem", label: "OEM / white-label customization" }],
    quantityOptions: [{ value: "100", label: "100 pieces" }, { value: "250", label: "250 pieces" }, { value: "500", label: "500 pieces" }, { value: "1000", label: "1,000 pieces" }, { value: "2500", label: "2,500 pieces" }, { value: "5000+", label: "5,000 pieces or more" }],
    selectPlaceholder: "Select an option", privacyNotice: "By sending this form, you agree that your information may be used to process your quote request.", privacyLink: "Privacy policy",
    submit: "Send request", pending: "Sending…", success: "Thank you! Your request has been saved and emailed.", error: "We could not process your request.", errorValidation: "Check the required fields.", errorDatabase: "Your request could not be saved. Please try again later.", errorEmail: "Your request is saved, but the email could not be sent. We will process it as soon as possible.", errorCaptcha: "The anti-bot check failed. Refresh it and try again.", errorRateLimit: "Too many requests were sent. Please try again in one hour.",
  },
  faq: { title: "Frequently asked questions", items: [
    { question: "What is the minimum order?", answer: "The minimum order is 100 pieces per style." },
    { question: "Do you ship internationally?", answer: "Yes, we export worldwide with the required documentation." },
    { question: "What are your production lead times?", answer: "Lead times depend on volume and customization and are confirmed with your quote." },
    { question: "Can I receive a sample?", answer: "Yes, a sample can be prepared to approve quality before ordering." },
  ] },
  footer: { tagline: "Chechia manufacturer & wholesaler, based in Egypt.", rights: "All rights reserved.", legal: "Legal notice", privacy: "Privacy" },
  about: {
    eyebrow: "About AL MUMAYIZ", title: "The wholesale chechia specialist",
    sub: "AL MUMAYIZ is a manufacturer and wholesaler of men's chechia caps based in Egypt. We supply wholesalers, retailers and distributors worldwide, straight from our factory.",
    storyEyebrow: "Our story", storyTitle: "From yarn to chechia, under one roof",
    storyP1: "Specialised in chechia from the start, we built an integrated factory in Egypt that controls every step: knitting, embroidery, quality control and packaging.",
    storyP2: "This full control lets us offer factory prices, consistent quality and a production capacity suited to wholesale orders, from the first carton to a full container.",
    mission: "To give professionals a quality chechia, in large quantities and at a fair price, straight from the manufacturer.",
    valuesEyebrow: "Our values", valuesTitle: "What drives us",
    values: [
      { title: "Quality", body: "Selected cotton and control at every stage for a flawless finish on every piece." },
      { title: "Capacity", body: "An integrated factory sized for wholesale orders and for meeting your deadlines." },
      { title: "Trust", body: "A reliable, transparent B2B partner committed for the long term." },
    ],
    ctaTitle: "Let's work together", ctaSub: "Looking for a reliable wholesale chechia supplier? Let's talk about your project and get your quote.",
  },
};

export default en;
