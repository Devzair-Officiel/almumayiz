import { createArticleAction } from "@/app/admin/actions";
import { ArticleEditor } from "@/components/article-editor";

export default function NewArticlePage() {
  return (
    <>
      <div className="admin-title-row admin-editor-title">
        <div>
          <p className="admin-kicker">Éditeur</p>
          <h1>Nouvel article</h1>
          <p>Rédigez votre contenu, prévisualisez-le puis publiez quand il est prêt.</p>
        </div>
      </div>
      <ArticleEditor action={createArticleAction} />
    </>
  );
}
