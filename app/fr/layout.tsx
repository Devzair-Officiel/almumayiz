import { CookieBanner } from "@/components/cookie-banner";
import "../globals.css";
import "../blog-cms.css";
import "../about.css";

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
