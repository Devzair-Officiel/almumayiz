import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteHeader, WHATSAPP_URL } from "@/components/site-shell";
import { getDictionary } from "@/lib/i18n";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";
const PAGE_PATH = "/fr/grossiste-chechia";
const TITLE = "Grossiste chéchia pour professionnels | AL MUMAYIZ";
const DESCRIPTION = "AL MUMAYIZ fournit des chéchias en gros pour boutiques, revendeurs, importateurs et distributeurs. Commande minimum 100 pièces et devis professionnel.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}${PAGE_PATH}` },
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website", url: `${SITE_URL}${PAGE_PATH}` },
  robots: { index: true, follow: true },
};

const reassurance = [
  "Commande en gros dès 100 pièces",
  "Fourniture B2B pour professionnels",
  "Devis adapté à votre projet",
  "Personnalisation selon quantité et faisabilité",
  "Échantillon possible avant commande",
];

const sections = [
  {
    title: "Acheter des chéchias en gros pour votre boutique",
    body: "En tant que grossiste, AL MUMAYIZ permet aux boutiques d’acheter des chéchias en gros directement auprès du fabricant. Vous constituez votre stock avec des modèles homme tricotés en coton, disponibles en plusieurs coloris et tailles, et adaptés à une clientèle de boutique musulmane comme à une vente plus large. L’achat de chéchia en gros vous donne un coût maîtrisé et un réassort régulier.",
  },
  {
    title: "Une commande minimum à partir de 100 pièces",
    body: "La vente en gros de chéchias démarre à 100 pièces. Ce minimum de commande convient aussi bien à une première mise en rayon qu’à un réassort, puis évolue selon vos volumes jusqu’aux commandes en conteneur. Vous pouvez répartir vos quantités sur plusieurs coloris afin de tester ce qui se vend le mieux dans votre point de vente.",
  },
  {
    title: "Une offre pensée pour les boutiques, revendeurs et importateurs",
    body: "Notre fourniture s’adresse uniquement aux professionnels. Que vous soyez revendeur de chéchia, boutique physique ou en ligne, importateur ou distributeur, vous bénéficiez d’un interlocuteur dédié, de conditions en gros et d’une logistique export. AL MUMAYIZ accompagne aussi bien le commerce de proximité que les distributeurs qui couvrent plusieurs marchés.",
  },
  {
    title: "Pourquoi choisir un grossiste spécialisé en chéchias ?",
    body: "Passer par un fabricant et fournisseur spécialisé en chéchias, plutôt que par un intermédiaire généraliste, vous donne un produit maîtrisé du fil à la pièce finie. Nous tricotons, brodons, contrôlons et conditionnons dans notre usine en Égypte, ce qui assure une qualité régulière d’une commande à l’autre et une capacité de production adaptée aux volumes professionnels.",
  },
  {
    title: "Échantillon, devis et suivi de commande",
    body: "Avant de vous engager, vous pouvez recevoir un échantillon pour valider la qualité et le rendu des modèles. Nous établissons ensuite un devis professionnel selon vos coloris et vos quantités, puis nous lançons la production et assurons le suivi jusqu’à la livraison. Chaque étape est confirmée avec vous pour éviter les mauvaises surprises.",
  },
  {
    title: "Personnalisation et marque blanche",
    body: "Selon la quantité et la faisabilité, nous étudions les demandes de personnalisation : coloris, étiquetage et emballage à votre marque. La marque blanche permet aux revendeurs et distributeurs de proposer la chéchia sous leur propre nom. Indiquez votre besoin dans votre demande de devis et nous reviendrons vers vous sur les options possibles.",
  },
];

const jsonLd = {
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
};

export default async function GrossisteChechiaPage() {
  const copy = await getDictionary("fr");

  return (
    <>
      <SiteHeader locale="fr" copy={copy} />
      <main>
        <section className="split-hero">
          <div className="page-shell split-hero-grid">
            <div>
              <nav className="breadcrumb" aria-label="Fil d’ariane">
                <Link href="/fr">Accueil</Link>
                <span style={{ margin: "0 8px", opacity: 0.5 }}>/</span>
                <span>Grossiste chéchia</span>
              </nav>
              <p className="eyebrow">Vente en gros · B2B</p>
              <h1>Grossiste chéchia pour professionnels</h1>
              <p className="hero-body">
                AL MUMAYIZ est un grossiste et fabricant qui fournit des chéchias en gros aux professionnels : boutiques, revendeurs,
                importateurs et distributeurs. La vente se fait en gros uniquement, avec une commande minimum de 100 pièces et un devis
                adapté à votre projet.
              </p>
              <div className="hero-actions">
                <a className="button button-gold" href="/fr#contact">Demander un devis en gros</a>
                <a className="button button-outline" href={WHATSAPP_URL} target="_blank" rel="noreferrer">{copy.hero.whatsapp} ↗</a>
              </div>
            </div>
            <div className="split-hero-art">
              <span className="ring" />
              <div className="caps">
                <Image src="/images/products/beige.png" width={108} height={108} alt="Chéchia beige en gros" />
                <Image src="/images/products/olive.png" width={152} height={152} alt="Chéchia homme olive en gros" />
                <Image src="/images/products/black.png" width={108} height={108} alt="Chéchia noire en gros" />
              </div>
              <span className="made-badge">✓ Made in Egypt</span>
            </div>
          </div>
        </section>

        <section className="reassurance-dark">
          <div className="page-shell reassurance-dark-grid">
            {reassurance.map((item) => <div key={item}>{item}</div>)}
          </div>
        </section>

        <section>
          <div className="page-shell content-stack">
            {sections.map((section) => (
              <div key={section.title}>
                <h2>{section.title}</h2>
                <p>{section.body}</p>
              </div>
            ))}

            <div className="cta-box">
              <h2>Demander un devis pour une commande de chéchias en gros</h2>
              <p>
                Indiquez vos modèles, coloris et quantités : nous vous adressons un devis professionnel adapté à votre projet. Pour
                information, certains clients écrivent « chechia » ou « chachia », mais il s’agit du même produit.
              </p>
              <div className="hero-actions">
                <a className="button button-gold" href="/fr#contact">Demander un devis en gros</a>
                <a className="button button-outline" href={WHATSAPP_URL} target="_blank" rel="noreferrer">{copy.hero.whatsapp} ↗</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter locale="fr" copy={copy} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </>
  );
}
