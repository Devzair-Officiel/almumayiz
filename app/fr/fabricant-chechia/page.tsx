import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteHeader, WHATSAPP_URL } from "@/components/site-shell";
import { getDictionary } from "@/lib/i18n";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";
const PAGE_PATH = "/fr/fabricant-chechia";
const TITLE = "Fabricant chéchia pour professionnels | AL MUMAYIZ";
const DESCRIPTION =
  "AL MUMAYIZ accompagne les professionnels dans la fabrication et l'achat de chéchias en gros. Commande minimum 100 pièces, devis et personnalisation.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}${PAGE_PATH}` },
  openGraph: {
    title: "Fabricant chéchia pour professionnels | AL MUMAYIZ",
    description:
      "Fabrication de chéchias en gros pour boutiques, revendeurs, importateurs et distributeurs. Minimum 100 pièces, devis et personnalisation.",
    type: "website",
    url: `${SITE_URL}${PAGE_PATH}`,
    images: [{ url: `${SITE_URL}/images/brand/og-default.jpg`, alt: "Fabricant chéchia AL MUMAYIZ" }],
  },
  robots: { index: true, follow: true },
};

const reassurance = [
  "Fabricant et fournisseur B2B",
  "Commande minimum 100 pièces",
  "Production pensée pour les professionnels",
  "Échantillon possible avant commande",
  "Personnalisation selon quantité et faisabilité",
];

const pros = [
  {
    label: "Boutiques musulmanes",
    desc: "Vous cherchez un fabricant chéchia fiable pour vous approvisionner régulièrement avec des modèles homme en plusieurs coloris et tailles, issus d'une production contrôlée.",
  },
  {
    label: "Revendeurs en ligne",
    desc: "Vous souhaitez travailler directement avec un fabricant de chéchias pour garantir la cohérence des lots et renouveler votre offre sans dépendre d'un intermédiaire.",
  },
  {
    label: "Importateurs",
    desc: "Vous opérez sur des marchés internationaux et avez besoin d'un fabricant chéchia capable d'assurer un approvisionnement sérieux avec un suivi de production clair.",
  },
  {
    label: "Distributeurs",
    desc: "Vous gérez plusieurs points de vente et avez besoin d'un fournisseur fabricant capable de maintenir une qualité constante d'un lot à l'autre.",
  },
  {
    label: "Marque blanche / OEM",
    desc: "Vous développez votre propre identité commerciale. AL MUMAYIZ étudie les projets OEM et marque blanche selon les quantités et la faisabilité.",
  },
];

const processSteps = [
  "Indiquez les modèles de chéchias souhaités, les coloris, les tailles et les quantités via le formulaire de devis.",
  "Précisez vos options de personnalisation si vous en avez : couleur spécifique, broderie, étiquette ou emballage.",
  "Indiquez si nécessaire le contexte de revente ou la destination pour adapter le devis à votre projet.",
  "AL MUMAYIZ examine la demande et revient vers vous avec un devis professionnel, sans engagement de votre part.",
  "Si vous le souhaitez, un échantillon peut être envisagé avant de valider une commande en volume.",
];

const faqItems = [
  {
    q: "Quelle est la commande minimum pour une fabrication de chéchias ?",
    a: "La commande minimum chez AL MUMAYIZ est de 100 pièces. Ce seuil s'applique à l'ensemble de la commande, avec la possibilité de répartir sur plusieurs coloris ou modèles selon votre projet.",
  },
  {
    q: "AL MUMAYIZ vend-il aux particuliers ?",
    a: "Non. AL MUMAYIZ est exclusivement orienté B2B. Nous travaillons avec des boutiques, revendeurs, importateurs, distributeurs et porteurs de projets OEM ou marque blanche.",
  },
  {
    q: "Peut-on demander un échantillon avant une commande ?",
    a: "Oui, un échantillon peut être envisagé pour contrôler le rendu, la matière, la taille, la couleur et les finitions avant de s'engager sur une commande en volume. Mentionnez votre besoin dans le formulaire de devis.",
  },
  {
    q: "Peut-on personnaliser les chéchias ?",
    a: "Certaines personnalisations peuvent être étudiées selon la quantité et la faisabilité : coloris spécifiques, broderie, étiquette à votre nom, emballage personnalisé ou fabrication en marque blanche OEM.",
  },
  {
    q: "Quelle différence entre fabricant, grossiste et fournisseur de chéchias ?",
    a: "Un fabricant de chéchias produit directement en usine et maîtrise toute la chaîne : matière, tricotage, finition, conditionnement. Un grossiste peut être revendeur ou intermédiaire sans production propre. Un fournisseur désigne plus généralement toute entreprise qui approvisionne un professionnel. Chez AL MUMAYIZ, les trois rôles se rejoignent : nous sommes fabricant, fournisseur et grossiste B2B de chéchias.",
  },
  {
    q: "Peut-on créer une chéchia en marque blanche ?",
    a: "Les projets de marque blanche et OEM sont étudiés selon la quantité et la faisabilité. Si vous souhaitez commercialiser des chéchias sous votre propre identité, mentionnez-le dans votre formulaire de devis.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/fr` },
      { "@type": "ListItem", position: 2, name: "Fabricant chéchia", item: `${SITE_URL}${PAGE_PATH}` },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AL MUMAYIZ",
    url: SITE_URL,
    description:
      "Fabricant, grossiste et fournisseur B2B de chéchias. Usine de production en Égypte. Commande minimum 100 pièces. Vente en gros exclusivement pour les professionnels.",
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Fabrication et fourniture de chéchias en gros",
    description:
      "Service B2B de fabrication et de vente en gros de chéchias tricotées. Commande minimum 100 pièces. Devis sur demande. Accessible aux boutiques, revendeurs, importateurs, distributeurs et projets OEM.",
    provider: { "@type": "Organization", name: "AL MUMAYIZ", url: SITE_URL },
    serviceType: "Fabrication en gros",
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

export default async function FabricantChechiaPage() {
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
                <span>Fabricant chéchia</span>
              </nav>
              <p className="eyebrow">Fabrication · B2B · Fournisseur</p>
              <h1>Fabricant chéchia pour professionnels</h1>
              <p className="hero-body">
                AL MUMAYIZ accompagne les boutiques, revendeurs, importateurs et distributeurs qui recherchent
                un fabricant de chéchias pour des commandes en gros, avec un minimum de 100 pièces et un
                devis adapté au projet.
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
              <Image
                src="/images/factory/atelier-chechias.webp"
                width={420}
                height={420}
                alt="Atelier de fabrication de chéchias AL MUMAYIZ en Égypte"
                priority
                style={{ borderRadius: "12px", objectFit: "cover", width: "100%", height: "auto" }}
              />
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
              <h2>Un fabricant de chéchias pour les professionnels</h2>
              <p>
                Cette page s'adresse aux professionnels qui souhaitent s'approvisionner auprès d'un fabricant
                ou partenaire de production, et non acheter à l'unité. Travailler directement avec un fabricant
                de chéchias signifie traiter à la source, sans intermédiaire : vous accédez à la production
                elle-même, à ses contraintes réelles, à ses possibilités de personnalisation et à la régularité
                que seul un fabricant peut garantir d'une commande à l'autre. AL MUMAYIZ produit les chéchias
                dans son usine en Égypte. C'est ce positionnement fabricant — et non revendeur — qui nous
                permet de vous offrir un suivi de qualité clair et constant.
              </p>
            </div>

            <div>
              <h2>Pourquoi travailler avec un fabricant plutôt qu'un simple revendeur ?</h2>
              <p>
                Un revendeur achète à d'autres sources et distribue. Un fabricant de chéchias produit
                lui-même et maîtrise la matière, le tricotage, les finitions et le conditionnement. Cette
                différence a des conséquences concrètes pour un professionnel qui commande en gros : la
                cohérence de la gamme est mieux assurée, la régularité des lots est plus fiable, et les
                échanges sur la qualité sont directs. Quand un détail ne correspond pas à vos attentes,
                vous traitez avec l'équipe qui a fabriqué le produit. Cette proximité avec la production
                facilite aussi les demandes de personnalisation — couleur, étiquette, emballage — selon
                la quantité et la faisabilité, sans passer par des intermédiaires qui relaient sans décider.
              </p>
            </div>
          </div>
        </section>

        {/* ── Production ── */}
        <section>
          <div className="page-shell content-stack">
            <div>
              <h2>Une production adaptée aux commandes en gros</h2>
              <p>
                Une commande professionnelle ne s'improvise pas. Elle demande une organisation claire :
                modèles à produire, coloris retenus, tailles concernées, quantités par référence, finitions
                attendues, conditionnement si nécessaire. AL MUMAYIZ accompagne ses clients professionnels
                dans cette phase de cadrage avant de préparer le devis. L'objectif est de vous proposer
                une offre adaptée à votre projet réel, sans approximation. Que vous commandiez pour une
                boutique, un réseau de revente ou un projet de marque propre, la production suit un cadre
                défini en amont pour éviter les malentendus en cours de fabrication.
              </p>
            </div>

            <div>
              <h2>Commande minimum à partir de 100 pièces</h2>
              <p>
                Le minimum de commande est fixé à 100 pièces. Ce seuil est calibré pour les professionnels
                qui veulent tester une gamme, constituer un stock de départ ou préparer un réassort sans
                s'engager sur des volumes disproportionnés. Vous pouvez répartir les 100 pièces sur plusieurs
                coloris ou modèles selon vos besoins, ce qui permet de diversifier votre offre dès la
                première commande. Ce minimum s'applique également aux projets OEM ou marque blanche,
                dans la mesure où la faisabilité est confirmée au préalable.
              </p>
            </div>

            <div>
              <h2>Qualité, régularité et échantillon avant commande</h2>
              <p>
                La régularité des lots est une priorité pour tout revendeur ou distributeur qui construit
                une offre stable. Les chéchias que vous recevrez à la deuxième commande doivent être
                identiques à celles de la première en termes de matière, de taille et de finition. C'est
                ce que permet une fabrication maîtrisée de bout en bout. Avant de vous engager sur un
                volume, vous pouvez demander un échantillon pour contrôler le rendu, la couleur, la taille
                et les finitions. Cette étape est particulièrement utile lors d'une première collaboration
                ou lorsque vous intégrez un nouveau modèle à votre gamme.
              </p>
            </div>

            <div>
              <h2>Personnalisation, OEM et marque blanche</h2>
              <p>
                Selon la quantité et la faisabilité, AL MUMAYIZ étudie les demandes de personnalisation :
                coloris spécifiques, broderie, étiquetage à votre nom, emballage adapté à votre identité
                ou fabrication en marque blanche. Les projets OEM permettent à des distributeurs ou des
                marques de proposer la chéchia sous leur propre identité commerciale, sans avoir à gérer
                la production eux-mêmes. Si vous avez un projet de ce type, mentionnez-le dans votre
                demande de devis afin que nous puissions évaluer les possibilités selon votre volume et
                vos contraintes.
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

        {/* ── Processus devis ── */}
        <section>
          <div className="page-shell content-stack">
            <div>
              <h2>Comment demander un devis à un fabricant de chéchias ?</h2>
              <p>Le processus est conçu pour être simple. Voici les cinq étapes :</p>
              <div className="gc-process">
                {processSteps.map((step, i) => (
                  <div key={i} className="gc-step">
                    <div className="gc-step-num">{i + 1}</div>
                    <p>{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Produits visuels ── */}
        <section className="reassurance-dark">
          <div className="page-shell" style={{ textAlign: "center", padding: "var(--space-xl) 0" }}>
            <p className="eyebrow" style={{ marginBottom: "var(--space-m)" }}>Modèles disponibles</p>
            <div style={{ display: "flex", gap: "var(--space-m)", justifyContent: "center", flexWrap: "wrap" }}>
              <Image src="/images/products/beige.webp" width={108} height={108} alt="Chéchia beige fabrication AL MUMAYIZ" />
              <Image src="/images/products/olive.webp" width={108} height={108} alt="Chéchia olive fabrication AL MUMAYIZ" />
              <Image src="/images/products/black.webp" width={108} height={108} alt="Chéchia noire fabrication AL MUMAYIZ" />
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="faq section">
          <div className="page-shell">
            <h2>Questions fréquentes sur la fabrication de chéchias</h2>
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
              <h2>Vous cherchez un fabricant de chéchias pour votre projet ?</h2>
              <p>
                Indiquez vos modèles, quantités et options souhaitées. AL MUMAYIZ vous accompagne dans
                votre approvisionnement en chéchias en gros avec une commande minimum de 100 pièces et
                un devis adapté à votre projet professionnel.
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
