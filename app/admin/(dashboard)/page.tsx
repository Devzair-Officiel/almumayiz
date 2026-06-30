import Link from "next/link";
import prisma from "@/lib/prisma";
import { ArticleActions } from "./article-actions";

export default async function AdminDashboardPage() {
  const articles = await prisma.article.findMany({ orderBy: { updatedAt: "desc" } });
  const published = articles.filter((article) => article.status === "PUBLISHED").length;
  const drafts = articles.length - published;

  return (
    <>
      <div className="admin-title-row">
        <div>
          <p className="admin-kicker">Vue d'ensemble</p>
          <h1>Vos articles</h1>
          <p>Créez et pilotez le contenu éditorial de votre site.</p>
        </div>
        <Link className="admin-primary" href="/admin/articles/new">＋ Nouvel article</Link>
      </div>

      <div className="admin-metrics">
        <article>
          <span>Articles</span>
          <strong>{articles.length}</strong>
          <small>Contenus au total</small>
        </article>
        <article>
          <span>Publiés</span>
          <strong>{published}</strong>
          <small>Visibles sur le blog</small>
        </article>
        <article>
          <span>Brouillons</span>
          <strong>{drafts}</strong>
          <small>À finaliser</small>
        </article>
      </div>

      <div className="admin-section-heading">
        <div>
          <h2>Contenus récents</h2>
          <p>Gérez, prévisualisez ou supprimez vos articles.</p>
        </div>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Article</th>
              <th>Langue</th>
              <th>Statut</th>
              <th>Mis à jour</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id}>
                <td>
                  <strong>{article.title}</strong>
                  <small>/{article.locale}/blog/{article.slug}</small>
                </td>
                <td>{article.locale.toUpperCase()}</td>
                <td>
                  <span className={`status-badge ${article.status.toLowerCase()}`}>
                    {article.status === "PUBLISHED" ? "Publié" : "Brouillon"}
                  </span>
                </td>
                <td>{article.updatedAt.toLocaleDateString("fr-FR")}</td>
                <td>
                  <ArticleActions
                    id={article.id}
                    locale={article.locale}
                    slug={article.slug}
                    status={article.status}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!articles.length && (
          <div className="admin-empty">Aucun article. Crée ton premier contenu SEO.</div>
        )}
      </div>
    </>
  );
}
