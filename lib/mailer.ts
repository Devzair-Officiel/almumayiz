import "server-only";

import nodemailer from "nodemailer";

type QuoteEmail = {
  name: string;
  company: string | null;
  country: string | null;
  email: string;
  phone: string | null;
  product: string | null;
  quantity: string;
  message: string | null;
  locale: string;
};

const escapeHtml = (value: string) =>
  value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character] ?? character);

const display = (value: string | null) => value?.trim() || "—";

function getTransporter() {
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;

  if (!user || !password) {
    throw new Error("SMTP_USER and SMTP_PASSWORD must be configured");
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "ssl0.ovh.net",
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: process.env.SMTP_SECURE !== "false",
    auth: { user, pass: password },
  });
}

export async function sendQuoteEmail(quote: QuoteEmail) {
  const recipient = process.env.QUOTE_RECIPIENT_EMAIL ?? "contact@al-mumayiz.com";
  const from = process.env.SMTP_FROM ?? `AL MUMAYIZ <${process.env.SMTP_USER}>`;
  const subject = `Nouvelle demande de devis — ${quote.name}`;
  const rows = [
    ["Nom", quote.name],
    ["Société", display(quote.company)],
    ["Pays", display(quote.country)],
    ["E-mail", quote.email],
    ["Téléphone / WhatsApp", display(quote.phone)],
    ["Produit(s)", display(quote.product)],
    ["Quantité", quote.quantity],
    ["Langue du site", quote.locale.toUpperCase()],
  ];

  const text = [
    "Nouvelle demande de devis reçue depuis al-mumayiz.com",
    "",
    ...rows.map(([label, value]) => `${label} : ${value}`),
    "",
    "Message :",
    display(quote.message),
  ].join("\n");

  const htmlRows = rows.map(([label, value]) => `
    <tr>
      <th style="padding:9px 12px;text-align:left;border-bottom:1px solid #e5dfd2;color:#536057">${escapeHtml(label)}</th>
      <td style="padding:9px 12px;border-bottom:1px solid #e5dfd2">${escapeHtml(value)}</td>
    </tr>`).join("");

  await getTransporter().sendMail({
    from,
    to: recipient,
    replyTo: quote.email,
    subject,
    text,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;color:#172019">
        <div style="background:#15251b;color:#f7f1e5;padding:24px 28px">
          <h1 style="font-size:22px;margin:0">Nouvelle demande de devis</h1>
        </div>
        <div style="padding:24px 28px;background:#f7f1e5">
          <table style="width:100%;border-collapse:collapse;background:#fff">${htmlRows}</table>
          <h2 style="font-size:16px;margin:26px 0 8px">Message</h2>
          <p style="white-space:pre-wrap;background:#fff;padding:16px;margin:0">${escapeHtml(display(quote.message))}</p>
          <p style="font-size:12px;color:#697069;margin-top:20px">Répondez directement à cet e-mail pour contacter ${escapeHtml(quote.name)}.</p>
        </div>
      </div>`,
  });
}
