import "server-only";

import prisma from "@/lib/prisma";

export async function consumeRateLimit(key: string, limit: number, windowSeconds: number) {
  const rows = await prisma.$queryRaw<Array<{ count: number }>>`
    INSERT INTO "SubmissionRateLimit" ("key", "count", "windowStart", "expiresAt", "updatedAt")
    VALUES (${key}, 1, NOW(), NOW() + (${windowSeconds} * INTERVAL '1 second'), NOW())
    ON CONFLICT ("key") DO UPDATE SET
      "count" = CASE
        WHEN "SubmissionRateLimit"."expiresAt" <= NOW() THEN 1
        ELSE "SubmissionRateLimit"."count" + 1
      END,
      "windowStart" = CASE
        WHEN "SubmissionRateLimit"."expiresAt" <= NOW() THEN NOW()
        ELSE "SubmissionRateLimit"."windowStart"
      END,
      "expiresAt" = CASE
        WHEN "SubmissionRateLimit"."expiresAt" <= NOW() THEN NOW() + (${windowSeconds} * INTERVAL '1 second')
        ELSE "SubmissionRateLimit"."expiresAt"
      END,
      "updatedAt" = NOW()
    RETURNING "count"
  `;

  return (rows[0]?.count ?? limit + 1) <= limit;
}
