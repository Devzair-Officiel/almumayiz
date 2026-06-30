import { remark } from "remark";
import html from "remark-html";

// sanitize: false — Le contenu Markdown est rédigé exclusivement par des
// administrateurs authentifiés via l'interface d'édition privée. Aucun HTML
// soumis par des visiteurs publics n'atteint cette fonction. Modifier ce
// paramètre risque de casser le rendu des articles existants qui contiennent
// du HTML inline (images avec attributs, iframes, etc.).
export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(html, { sanitize: false }).process(markdown);
  // Le titre de l'article est affiché par le template de page : on retire
  // un éventuel <h1> en tête de contenu pour éviter le doublon.
  return result.toString().replace(/^\s*<h1[^>]*>.*?<\/h1>\s*/i, "");
}

export function readingTime(markdown: string): number {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}
