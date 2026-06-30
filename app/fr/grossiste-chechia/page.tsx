import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteHeader, WHATSAPP_URL } from "@/components/site-shell";
import { getDictionary } from "@/lib/i18n";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";
const PAGE_PATH = "/fr/grossiste-chechia";
const TITLE = "Grossiste chéchia & achat en gros | AL MUMAYIZ";
const DESCRIPTION =
  "Achetez vos chéchias en gros avec AL MUMAYIZ : grossiste et fabricant B2B pour boutiques, revendeurs et importateurs. Minimum 100 pièces.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}${PAGE_PATH}` },
  openGraph: {
    title: "Grossiste chéchia & achat en gros | AL MUMAYIZ",
    description:
      "Chéchias en gros pour professionnels : minimum 100 pièces, devis, échantillon, personnalisation et marque blanche selon projet.",
    type: "website",
    url: `${SITE_URL}${PAGE_PATH}`,
  },
  robots: { index: true, follow: true },
};

const reassurance = [
  "Commande minimum 100 pièces",
  "Vente en gros uniquement",
  "Grossiste et fabricant B2B",
  "Échantillon possible avant commande",
  "Personnalisation selon quantité et faisabilité",
];

const pros = [
  {
    label: "Boutiques musulmanes",
    desc: "Vous cherchez à compléter votre rayon avec des chéchias homme en gros, disponibles en plusieurs coloris et tailles pour une clientèle variée.",
  },
  {
    label: "Revendeurs en ligne",
    desc: "Vous vendez sur marketplace ou site e-commerce et avez besoin d'un fournisseur chéchia fiable pour constituer et renouveler votre stock.",
  },
  {
    label: "Importateurs",
    desc: "Vous opérez sur des marchés à l'international et avez besoin d'un grossiste chéchia capable d'assurer un suivi export rigoureux.",
  },
  {
    label: "Distributeurs",
    desc: "Vous approvisionnez plusieurs points de vente et avez besoin de volumes réguliers avec une qualité constante d'une commande à l'autre.",
  },
  {
    label: "Marque blanche",
    desc: "Vous souhaitez proposer la chéchia sous votre propre marque. Étiquetage, emballage et personnalisation étudiés selon quantité et faisabilité.",
  },
];

const processSteps = [
  "Indiquez vos modèles, couleurs et quantités via le formulaire de devis.",
  "AL MUMAYIZ vérifie la faisabilité de votre demande.",
  "Un devis professionnel est préparé et transmis selon votre projet.",
  "La commande peut être confirmée après validation, avec ou sans échantillon préalable.",
];

const faqItems = [
  {
    q: "Quelle est la commande minimum pour acheter des chéchias en gros ?",
    a: "La commande minimum chez AL MUMAYIZ est de 100 pièces. Ce minimum s'applique à l'ensemble de la commande, avec la possibilité de répartir sur plusieurs coloris.",
  },
  {
    q: "AL MUMAYIZ vend-il aux particuliers ?",
    a: "Non. AL MUMAYIZ est exclusivement orienté B2B. Nous nous adressons aux boutiques, revendeurs, importateurs et distributeurs professionnels.",
  },
  {
    q: "Peut-on recevoir un échantillon avant de commander ?",
    a: "Oui, un échantillon peut être envisagé pour vérifier le rendu, la taille, la couleur et les finitions avant une commande en volume.",
  },
  {
    q: "Peut-on personnaliser les chéchias ?",
    a: "Certaines personnalisations peuvent être étudiées selon la quantité et la faisabilité : couleurs, étiquette, emballage, broderie ou marque blanche.",
  },
  {
    q: "Comment demander un devis pour des chéchias en gros ?",
    a: "Renseignez le formulaire de devis en indiquant les modèles souhaités, les quantités, les couleurs et les éventuelles options de personnalisation.",
  },
  {
    q: "Quelle différence entre chéchia, chechia, chachia et chachiya ?",
    a: "Ces termes désignent souvent le même type de couvre-chef traditionnel. Sur le site AL MUMAYIZ, l'orthographe principale utilisée est « chéchia ».",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/fr` },
      { "@type": "ListItem", position: 2, name: "Grossiste chéchia", item: `${SITE_URL}${PAGE_PATH}` },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AL MUMAYIZ",
    url: SITE_URL,
    description: "Grossiste, fabricant et fournisseur B2B de chéchias en gros, usine en Égypte. Commande minimum 100 pièces.",
    makesOffer: {
      "@type": "Offer",
      itemOffered: { "@type": "Product", name: "Chéchia en gros" },
      eligibleQuantity: { "@type": "QuantitativeValue", minValue: 100, unitText: "pièces" },
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  },
];

export default async function GrossisteChechiaPage() {
  const copy = await getDictionary("fr");

  return (
    <>
      <SiteHeader locale="fr" copy={copy} />
      <main>

        {/* ── Hero ── */}
        <section className="split-hero">
          <div className="page-shell split-hero-grid">
            <div>
              <nav className="breadcrumb" aria-label="Fil d'ariane">
                <Link href="/fr">Accueil</Link>
                <span style={{ margin: "0 8px", opacity: 0.5 }}>/</span>
                <span>Grossiste chéchia</span>
              </nav>
              <p className="eyebrow">Vente en gros · B2B · Fabricant</p>
              <h1>Grossiste chéchia pour professionnels</h1>
              <p className="hero-body">
                AL MUMAYIZ accompagne les boutiques, revendeurs, importateurs et distributeurs dans l'achat de
                chéchias en gros, avec une commande minimum de 100 pièces, un devis adapté et un suivi professionnel.
              </p>
              <div className="hero-actions">
                <a className="button button-gold" href="/fr#contact">Demander un devis</a>
                <a className="button button-outline" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                  {copy.hero.whatsapp} ↗
                </a>
              </div>
            </div>
            <div className="split-hero-art">
              <span className="ring" />
              <div className="caps">
                <Image src="/images/products/beige.webp" width={108} height={108} alt="Chéchia beige en gros" />
                <Image src="/images/products/olive.webp" width={152} height={152} alt="Chéchia homme olive en gros" />
                <Image src="/images/products/black.webp" width={108} height={108} alt="Chéchia noire en gros" />
              </div>
              <span className="made-badge">✓ Made in Egypt</span>
            </div>
          </div>
        </section>

        {/* ── Réassurance ── */}
        <section className="reassurance-dark">
          <div className="page-shell reassurance-dark-grid">
            {reassurance.map((item) => <div key={item}>{item}</div>)}
          </div>
        </section>

        {/* ── Sections texte principales ── */}
        <section>
          <div className="page-shell content-stack">
            <div>
              <h2>Acheter des chéchias en gros pour votre boutique</h2>
              <p>
                L'achat de chéchias en gros s'adresse aux professionnels qui souhaitent constituer un stock,
                tester une gamme ou préparer un réassort. Acheter des chéchias en gros directement auprès du
                fabricant vous permet de maîtriser vos coûts, d'assurer la cohérence des lots et de proposer une
                sélection régulière à vos clients. Que vous gériez une boutique physique ou une boutique en ligne,
                AL MUMAYIZ propose la chéchia en gros adaptée à vos volumes : modèles homme tricotés en coton,
                disponibles en plusieurs coloris et tailles, adaptés à une clientèle de boutique musulmane comme
                à une vente plus large.
              </p>
            </div>

            <div>
              <h2>Pourquoi choisir un grossiste spécialisé en chéchias ?</h2>
              <p>
                Un grossiste spécialisé en chéchias n'est pas un généraliste qui référence des centaines de
                produits différents. Chez AL MUMAYIZ, la chéchia est le seul produit : nous la tricotons,
                la contrôlons et la conditionnons dans notre usine en Égypte. Cette spécialisation vous garantit
                une régularité des lots d'une commande à l'autre, un interlocuteur qui connaît le produit en
                profondeur, et une gamme de coloris cohérente pour vos besoins de revendeur chéchia. Vous évitez
                les mauvaises surprises sur la taille, la matière ou le rendu.
              </p>
            </div>

            <div>
              <h2>Une commande minimum claire à partir de 100 pièces</h2>
              <p>
                La commande minimum est de 100 pièces. Ce seuil est pensé pour convenir aussi bien à une première
                mise en rayon qu'à un test de marché ou à un réassort régulier. Vous pouvez répartir vos quantités
                sur plusieurs coloris afin de tester ce qui correspond le mieux à vos clients, sans être contraint
                de commander un coloris unique en grande quantité. À mesure que vos volumes augmentent, les
                conditions de la vente en gros de chéchias évoluent en conséquence.
              </p>
            </div>
          </div>
        </section>

        {/* ── Pour quels professionnels ── */}
        <section className="gc-pros">
          <div className="page-shell">
            <p className="eyebrow">Clientèle B2B</p>
            <h2>Pour quels professionnels ?</h2>
            <div className="gc-pros-grid">
              {pros.map((p) => (
                <div key={p.label} className="gc-pros-card">
                  <strong>{p.label}</strong>
                  <p>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Processus + Échantillon + Personnalisation ── */}
        <section>
          <div className="page-shell content-stack">
            <div>
              <h2>Comment se déroule une demande de devis chéchia en gros ?</h2>
              <p>Le processus est simple. Voici les quatre étapes habituelles :</p>
              <div className="gc-process">
                {processSteps.map((step, i) => (
                  <div key={i} className="gc-step">
                    <div className="gc-step-num">{i + 1}</div>
                    <p>{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2>Échantillon, régularité et contrôle avant commande</h2>
              <p>
                Avant de vous engager sur un volume important, vous pouvez demander un échantillon pour vérifier
                le rendu, la matière, la taille, la couleur et les finitions. C'est une étape utile lors d'une
                première commande ou lorsque vous testez un nouveau modèle. AL MUMAYIZ s'engage sur une régularité
                des lots : les chéchias de votre deuxième commande doivent être identiques à celles de la première.
                Cette cohérence est essentielle pour un revendeur chéchia qui souhaite construire une offre stable
                et fidéliser sa clientèle.
              </p>
            </div>

            <div>
              <h2>Personnalisation, OEM et marque blanche</h2>
              <p>
                Selon la quantité et la faisabilité, AL MUMAYIZ étudie les demandes de personnalisation : choix
                de couleurs spécifiques, broderie, étiquetage à votre nom, emballage personnalisé ou fabrication
                en marque blanche. Ces options permettent aux distributeurs et revendeurs de proposer la chéchia
                personnalisée sous leur propre identité commerciale. Si vous avez un projet de ce type, mentionnez-le
                dans votre demande de devis afin que nous puissions évaluer les possibilités.
              </p>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="faq section">
          <div className="page-shell">
            <h2>Questions fréquentes sur l'achat de chéchias en gros</h2>
            <div className="faq-list">
              {faqItems.map(({ q, a }) => (
                <details key={q}>
                  <summary>{q}<span>+</span></summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA final ── */}
        <section>
          <div className="page-shell content-stack">
            <div className="cta-box">
              <h2>Vous cherchez un grossiste chéchia pour votre boutique ?</h2>
              <p>
                Indiquez vos quantités, modèles et options souhaitées. AL MUMAYIZ vous accompagne dans votre achat
                de chéchias en gros avec une commande minimum de 100 pièces et un devis adapté à votre projet
                professionnel.
              </p>
              <div className="hero-actions">
                <a className="button button-gold" href="/fr#contact">Demander un devis</a>
                <a className="button button-outline" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                  {copy.hero.whatsapp} ↗
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>
      <SiteFooter locale="fr" copy={copy} />
      {jsonLd.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item).replace(/</g, "\\u003c") }}
        />
      ))}
    </>
  );
}
