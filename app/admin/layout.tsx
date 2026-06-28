import type { Metadata } from "next";
import "../globals.css";
import "../blog-cms.css";

export const metadata: Metadata = { title: "Administration | AL MUMAYIZ", robots: { index: false, follow: false } };

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="fr"><body className="admin-body">{children}</body></html>;
}
