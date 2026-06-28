import "server-only";

import { compare } from "bcryptjs";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE_NAME = "almumayiz_admin";
const SESSION_DURATION = 8 * 60 * 60;
const runtimeEnv = (name: string) => process.env[name];

function authSecret() {
  const secret = runtimeEnv("AUTH_SECRET") ?? runtimeEnv("RATE_LIMIT_SECRET");
  if (!secret) throw new Error("AUTH_SECRET must be configured");
  return secret;
}

function signature(expires: number) {
  return createHmac("sha256", authSecret())
    .update(`${runtimeEnv("ADMIN_EMAIL") ?? "admin"}:${expires}`)
    .digest("hex");
}

function safeEqual(left: string, right: string) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function verifyAdminCredentials(email: string, password: string) {
  const expectedEmail = runtimeEnv("ADMIN_EMAIL")?.trim().toLowerCase();
  const encodedPasswordHash = runtimeEnv("ADMIN_PASSWORD_HASH_BASE64");
  const passwordHash = encodedPasswordHash
    ? Buffer.from(encodedPasswordHash, "base64").toString("utf8")
    : runtimeEnv("ADMIN_PASSWORD_HASH");
  if (!expectedEmail || !passwordHash) throw new Error("Admin credentials are not configured");
  const emailMatches = safeEqual(email.trim().toLowerCase(), expectedEmail);
  const passwordMatches = await compare(password, passwordHash);
  if (process.env.NODE_ENV === "development" && (!emailMatches || !passwordMatches)) {
    console.warn("Admin login rejected", { emailMatches, passwordMatches });
  }
  return emailMatches && passwordMatches;
}

export async function createAdminSession() {
  const expires = Math.floor(Date.now() / 1000) + SESSION_DURATION;
  (await cookies()).set(COOKIE_NAME, `${expires}.${signature(expires)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/admin",
    maxAge: SESSION_DURATION,
    priority: "high",
  });
}

export async function deleteAdminSession() {
  (await cookies()).delete(COOKIE_NAME);
}

export async function isAdminAuthenticated() {
  try {
    const token = (await cookies()).get(COOKIE_NAME)?.value;
    if (!token) return false;
    const [rawExpires, rawSignature] = token.split(".");
    const expires = Number(rawExpires);
    if (!rawSignature || !Number.isSafeInteger(expires) || expires <= Date.now() / 1000) return false;
    return safeEqual(rawSignature, signature(expires));
  } catch {
    return false;
  }
}

export async function requireAdmin() {
  if (!await isAdminAuthenticated()) redirect("/admin/login");
}
