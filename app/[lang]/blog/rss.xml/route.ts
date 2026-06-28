import { isLocale } from "@/lib/i18n";
import { listPublishedArticles } from "@/lib/articles";
import { blogCopy } from "@/lib/blog-copy";

export const dynamic = "force-dynamic";
const xml = (value: string) => value.replace(/[<>&'\"]/g, (character) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[character] ?? character);

export async function GET(_request: Request, { params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) return new Response("Not found", { status: 404 });
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";
  const articles = await listPublishedArticles(lang);
  const items = articles.map((article) => `<item><title>${xml(article.title)}</title><link>${baseUrl}/${lang}/blog/${article.slug}</link><guid>${baseUrl}/${lang}/blog/${article.slug}</guid><description>${xml(article.excerpt)}</description><pubDate>${article.publishedAt?.toUTCString()}</pubDate></item>`).join("");
  const feed = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>AL MUMAYIZ — ${xml(blogCopy[lang].blog)}</title><link>${baseUrl}/${lang}/blog</link><description>${xml(blogCopy[lang].intro)}</description><language>${lang}</language>${items}</channel></rss>`;
  return new Response(feed, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=300" } });
}
