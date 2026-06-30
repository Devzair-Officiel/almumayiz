import "server-only";

export { locales, isLocale } from "./types";
export type { Locale, Dictionary } from "./types";

import fr from "./fr";
import en from "./en";
import ar from "./ar";
import type { Locale } from "./types";

const dictionaries = { fr, en, ar };

export async function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
