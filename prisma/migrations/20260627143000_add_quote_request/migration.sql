-- CreateTable
CREATE TABLE "QuoteRequest" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "company" TEXT,
    "country" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "product" TEXT,
    "quantity" TEXT NOT NULL,
    "message" TEXT,
    "locale" TEXT NOT NULL DEFAULT 'fr',
    "status" TEXT NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuoteRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "QuoteRequest_status_createdAt_idx" ON "QuoteRequest"("status", "createdAt");

-- CreateIndex
CREATE INDEX "QuoteRequest_email_idx" ON "QuoteRequest"("email");
