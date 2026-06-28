-- AlterTable
ALTER TABLE "QuoteRequest" ADD COLUMN "ipHash" TEXT;

-- CreateIndex
CREATE INDEX "QuoteRequest_ipHash_createdAt_idx" ON "QuoteRequest"("ipHash", "createdAt");
