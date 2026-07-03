"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n/types";

// Pages that only exist under /fr — switch to home page when changing locale.
const FR_ONLY_PREFIXES = ["/fr/grossiste-chechia", "/fr/fabricant-chechia"];

function getTargetPath(pathname: string, target: string): string {
  if (FR_ONLY_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return `/${target}`;
  }
  return pathname.replace(/^\/(fr|en|ar)/, `/${target}`);
}

export function LanguageLinks({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  return (
    <div className="languages" aria-label="Language">
      {locales.map((item) => (
        <Link
          key={item}
          href={getTargetPath(pathname, item)}
          className={item === locale ? "active" : ""}
          hrefLang={item}
        >
          {item.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
