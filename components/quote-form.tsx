"use client";

import { useActionState, useEffect, useRef } from "react";
import Link from "next/link";
import Script from "next/script";
import { createQuoteRequest, type QuoteFormState } from "@/app/actions";
import type { Dictionary, Locale } from "@/lib/i18n";

const initialState: QuoteFormState = { status: "idle" };

declare global {
  interface Window { turnstile?: { reset: () => void } }
}

export function QuoteForm({ locale, copy, turnstileSiteKey }: { locale: Locale; copy: Dictionary["form"]; turnstileSiteKey: string }) {
  const [state, formAction, pending] = useActionState(createQuoteRequest, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
    if (state.status === "error") window.turnstile?.reset();
  }, [state.status]);

  const field = (name: keyof typeof copy.fields, type = "text") => (
    <label className="form-field">
      <span>{copy.fields[name]}{["name", "email", "quantity"].includes(name) ? " *" : ""}</span>
      <input
        name={name}
        type={type}
        required={["name", "email", "quantity"].includes(name)}
        maxLength={name === "email" ? 180 : 240}
        aria-invalid={Boolean(state.errors?.[name as "name" | "email" | "quantity"])}
      />
    </label>
  );

  return (
    <form ref={formRef} action={formAction} className="quote-form">
      <input type="hidden" name="locale" value={locale} />
      <label className="honeypot" aria-hidden="true">
        Website<input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <div className="form-grid">
        {field("name")}{field("company")}{field("country")}{field("email", "email")}{field("phone", "tel")}
        <label className="form-field">
          <span>{copy.fields.product} *</span>
          <select name="product" required aria-invalid={Boolean(state.errors?.product)} defaultValue="">
            <option value="" disabled>{copy.selectPlaceholder}</option>
            {copy.productOptions.map((option) => <option key={option.value} value={option.label}>{option.label}</option>)}
          </select>
        </label>
        <label className="form-field">
          <span>{copy.fields.quantity} *</span>
          <select name="quantity" required aria-invalid={Boolean(state.errors?.quantity)} defaultValue="">
            <option value="" disabled>{copy.selectPlaceholder}</option>
            {copy.quantityOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </label>
      </div>
      <label className="form-field">
        <span>{copy.fields.message}</span>
        <textarea name="message" rows={5} maxLength={3000} />
      </label>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" />
      <div className="turnstile-wrap">
        <div className="cf-turnstile" data-sitekey={turnstileSiteKey} data-theme="light" data-size="flexible" data-language={locale} />
      </div>
      <p className="privacy-notice">{copy.privacyNotice} <Link href={`/${locale}/confidentialite`}>{copy.privacyLink}</Link>.</p>
      <button className="button button-gold submit-button" type="submit" disabled={pending}>
        {pending ? copy.pending : copy.submit}
      </button>
      <p className={`form-status ${state.status}`} aria-live="polite">
        {state.status === "success" ? copy.success : state.status === "error"
          ? state.message === "database" ? copy.errorDatabase
            : state.message === "email" ? copy.errorEmail
              : state.message === "captcha" ? copy.errorCaptcha
                : state.message === "rate_limit" ? copy.errorRateLimit
                  : state.errors ? copy.errorValidation : copy.error
          : ""}
      </p>
    </form>
  );
}
