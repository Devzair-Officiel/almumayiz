"use client";

import Link from "next/link";
import { deleteArticleAction } from "@/app/admin/actions";

type Props = {
  id: number;
  locale: string;
  slug: string;
  status: string;
};

export function ArticleActions({ id, locale, slug, status }: Props) {
  return (
    <div className="row-actions">
      <Link href={`/admin/articles/${id}/edit`}>Modifier</Link>
      {status === "PUBLISHED" && (
        <a href={`/${locale}/blog/${slug}`} target="_blank" rel="noopener noreferrer">
          Voir
        </a>
      )}
      <form
        action={deleteArticleAction.bind(null, id)}
        onSubmit={(e) => {
          if (!window.confirm("Supprimer cet article définitivement ?")) {
            e.preventDefault();
          }
        }}
      >
        <button className="danger">Supprimer</button>
      </form>
    </div>
  );
}
