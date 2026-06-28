import "server-only";

type TurnstileResponse = {
  success: boolean;
  hostname?: string;
  action?: string;
  "error-codes"?: string[];
};

const DEVELOPMENT_SECRET = "1x0000000000000000000000000000000AA";

export async function verifyTurnstile(token: string, remoteIp?: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY
    ?? (process.env.NODE_ENV === "development" ? DEVELOPMENT_SECRET : "");

  if (!secret || !token || token.length > 2048) return false;

  const body = new FormData();
  body.set("secret", secret);
  body.set("response", token);
  body.set("idempotency_key", crypto.randomUUID());
  if (remoteIp) body.set("remoteip", remoteIp);

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });
    if (!response.ok) return false;
    const result = await response.json() as TurnstileResponse;
    return result.success;
  } catch (error) {
    console.error("Turnstile verification failed", error);
    return false;
  }
}
