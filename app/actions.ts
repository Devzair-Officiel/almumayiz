"use server";

import prisma from "@/lib/prisma";
import { isLocale } from "@/lib/i18n";
import { sendQuoteEmail } from "@/lib/mailer";
import { verifyTurnstile } from "@/lib/turnstile";
import { consumeRateLimit } from "@/lib/rate-limit";
import { createHmac } from "node:crypto";
import { headers } from "next/headers";

export type QuoteFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<"name" | "email" | "product" | "quantity", string>>;
};

const value = (formData: FormData, key: string, maxLength: number) =>
  String(formData.get(key) ?? "").trim().slice(0, maxLength);

export async function createQuoteRequest(
  _previousState: QuoteFormState,
  formData: FormData,
): Promise<QuoteFormState> {
  // Bots tend to fill hidden fields. Return success without writing anything.
  if (value(formData, "website", 200)) return { status: "success" };

  const name = value(formData, "name", 120);
  const email = value(formData, "email", 180).toLowerCase();
  const product = value(formData, "product", 240);
  const quantity = value(formData, "quantity", 80);
  const errors: QuoteFormState["errors"] = {};

  if (name.length < 2) errors.name = "required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "invalid";
  if (!product) errors.product = "required";
  if (!quantity) errors.quantity = "required";

  if (Object.keys(errors).length) return { status: "error", errors };

  const rawLocale = value(formData, "locale", 5);
  const locale = isLocale(rawLocale) ? rawLocale : "fr";
  const requestHeaders = await headers();
  const remoteIp = requestHeaders.get("cf-connecting-ip")
    ?? requestHeaders.get("x-real-ip")
    ?? requestHeaders.get("x-forwarded-for")?.split(",").at(-1)?.trim()
    ?? "unknown";
  const hashSecret = process.env.RATE_LIMIT_SECRET ?? process.env.SMTP_PASSWORD ?? "local-development";
  const ipHash = createHmac("sha256", hashSecret).update(remoteIp).digest("hex");
  const emailHash = createHmac("sha256", hashSecret).update(email).digest("hex");
  try {
    const ipAllowed = await consumeRateLimit(`quote:ip15:${ipHash}`, 10, 15 * 60);
    const emailAllowed = ipAllowed
      ? await consumeRateLimit(`quote:email60:${emailHash}`, 5, 60 * 60)
      : false;
    if (!ipAllowed || !emailAllowed) return { status: "error", message: "rate_limit" };
  } catch (error) {
    console.error("Unable to apply quote rate limit", error);
    return { status: "error", message: "database" };
  }
  const turnstileToken = value(formData, "cf-turnstile-response", 2048);
  if (!await verifyTurnstile(turnstileToken, remoteIp === "unknown" ? undefined : remoteIp)) {
    return { status: "error", message: "captcha" };
  }

  try {
    const quote = await prisma.quoteRequest.create({
      data: {
        name,
        email,
        ipHash,
        quantity,
        locale,
        company: value(formData, "company", 160) || null,
        country: value(formData, "country", 100) || null,
        phone: value(formData, "phone", 80) || null,
        product,
        message: value(formData, "message", 3000) || null,
      },
    });

    try {
      await sendQuoteEmail(quote);
      await prisma.quoteRequest.update({
        where: { id: quote.id },
        data: { status: "EMAILED" },
      });
    } catch (error) {
      await prisma.quoteRequest.update({
        where: { id: quote.id },
        data: { status: "EMAIL_FAILED" },
      });
      console.error("Unable to email quote request", error);
      return { status: "error", message: "email" };
    }

    return { status: "success" };
  } catch (error) {
    console.error("Unable to save quote request", error);
    return { status: "error", message: "database" };
  }
}
