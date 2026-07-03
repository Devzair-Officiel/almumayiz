import type { Metadata } from "next";
import { CookieBanner } from "@/components/cookie-banner";
import { getSiteUrl } from "@/lib/site-url";
import "../globals.css";

export const metadata: Metadata = { metadataBase: new URL(getSiteUrl()) };

export default function FrenchRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" dir="ltr">
      <body>
        {children}
        <CookieBanner locale="fr" />
      </body>
    </html>
  );
}
