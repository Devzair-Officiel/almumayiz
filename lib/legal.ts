import "server-only";

const missing = (label: string) => `[${label}]`;

export function getLegalDetails() {
  return {
    entityName: process.env.LEGAL_ENTITY_NAME ?? "AL MUMAYIZ",
    legalForm: process.env.LEGAL_FORM ?? missing("forme juridique à renseigner"),
    address: process.env.LEGAL_ADDRESS ?? missing("adresse du siège à renseigner"),
    registration: process.env.LEGAL_REGISTRATION ?? missing("immatriculation à renseigner"),
    director: process.env.LEGAL_DIRECTOR ?? missing("directeur de publication à renseigner"),
    email: process.env.LEGAL_EMAIL ?? "contact@al-mumayiz.com",
    phone: process.env.LEGAL_PHONE ?? "+33 7 61 30 50 11",
    hostName: process.env.LEGAL_HOST_NAME ?? missing("hébergeur à renseigner"),
    hostAddress: process.env.LEGAL_HOST_ADDRESS ?? missing("adresse de l’hébergeur à renseigner"),
  };
}
