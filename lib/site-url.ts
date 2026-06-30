/**
 * Returns the production site URL with no trailing slash.
 * Throws in production if the env var is missing or still points to localhost,
 * so broken URLs fail loudly at runtime rather than being silently indexed by Google.
 */
export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL;
  if (!url || url.includes("localhost")) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        `NEXT_PUBLIC_SITE_URL must be a valid production URL (got: ${url ?? "undefined"})`
      );
    }
    return "http://localhost:3001";
  }
  return url.replace(/\/$/, "");
}
