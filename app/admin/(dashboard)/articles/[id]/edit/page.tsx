import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { updateArticleAction } from "@/app/admin/actions";
import { ArticleEditor } from "@/components/article-editor";

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const id = Number((await params).id);
  if (!Number.isInteger(id)) notFound();
  const article = await prisma.article.findUnique({ where: { id } });
  if (!article) notFound();
  return <><div className="admin-title-row admin-editor-title"><div><p className="admin-kicker">Éditeur</p><h1>Modifier l’article</h1><p>Les modifications seront visibles après enregistrement.</p></div></div><ArticleEditor action={updateArticleAction.bind(null, id)} article={article} /></>;
}
