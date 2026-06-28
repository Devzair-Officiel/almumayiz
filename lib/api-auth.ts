import "server-only";

import { createHash, timingSafeEqual } from "node:crypto";

export function isApiAuthorized(request: Request) {
  const expected = process.env.BLOG_API_KEY;
  const authorization = request.headers.get("authorization");
  const provided = authorization?.startsWith("Bearer ") ? authorization.slice(7).trim() : "";
  if (!expected || !provided) return false;
  const a = createHash("sha256").update(expected).digest();
  const b = createHash("sha256").update(provided).digest();
  return timingSafeEqual(a, b);
}

export const unauthorizedResponse = () => Response.json({ error: "Unauthorized" }, { status: 401 });
