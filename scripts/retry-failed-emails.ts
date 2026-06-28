import "dotenv/config";

import prisma from "../lib/prisma";
import { sendQuoteEmail } from "../lib/mailer";

const requestedLimit = Number(process.argv[2] ?? 20);
const limit = Number.isFinite(requestedLimit) ? Math.min(Math.max(requestedLimit, 1), 100) : 20;

const quotes = await prisma.quoteRequest.findMany({
  where: { status: "EMAIL_FAILED" },
  orderBy: { createdAt: "asc" },
  take: limit,
});

if (!quotes.length) {
  console.log("No failed quote emails to retry.");
  await prisma.$disconnect();
  process.exit(0);
}

let sent = 0;
let failed = 0;

for (const quote of quotes) {
  try {
    await sendQuoteEmail(quote);
    await prisma.quoteRequest.update({ where: { id: quote.id }, data: { status: "EMAILED" } });
    sent += 1;
    console.log(`Quote #${quote.id}: emailed`);
  } catch (error) {
    failed += 1;
    console.error(`Quote #${quote.id}: retry failed`, error instanceof Error ? error.message : error);
  }
}

await prisma.$disconnect();
console.log(`Retry complete: ${sent} sent, ${failed} failed.`);
if (failed) process.exitCode = 1;
