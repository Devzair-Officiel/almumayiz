import "server-only";

import { remark } from "remark";
import html from "remark-html";

export async function markdownToHtml(markdown: string) {
  const result = await remark().use(html, { sanitize: false }).process(markdown);
  // Le titre de l'article est déjà affiché par le template de la page : on retire
  // un éventuel <h1> en tête de contenu pour éviter le doublon.
  return result.toString().replace(/^\s*<h1[^>]*>.*?<\/h1>\s*/i, "");
}

export function readingTime(markdown: string) {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}
