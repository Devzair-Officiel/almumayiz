"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { markdownToHtml } from "@/lib/markdown-shared";
import type { AdminFormState } from "@/app/admin/actions";

type ArticleDraft = {
  locale?: string; title?: string; slug?: string; excerpt?: string; content?: string;
  coverImage?: string | null; seoTitle?: string | null; seoDescription?: string | null;
  seoKeywords?: string | null; canonicalUrl?: string | null;
  author?: string; status?: "DRAFT" | "PUBLISHED"; publishedAt?: Date | string | null;
};

type ArticleAction = (state: AdminFormState, formData: FormData) => Promise<AdminFormState>;

const slugify = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export function ArticleEditor({ action, article }: { action: ArticleAction; article?: ArticleDraft }) {
  const [state, formAction, pending] = useActionState(action, {});
  const [title, setTitle] = useState(article?.title ?? "");
  const [slug, setSlug] = useState(article?.slug ?? "");
  const [slugEdited, setSlugEdited] = useState(Boolean(article?.slug));
  const [content, setContent] = useState(article?.content ?? "");
  const [editorMode, setEditorMode] = useState<"write" | "preview">("write");
  const [previewHtml, setPreviewHtml] = useState<string>("");
  const contentRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!content) { setPreviewHtml(""); return; }
    let cancelled = false;
    markdownToHtml(content).then((rendered) => {
      if (!cancelled) setPreviewHtml(rendered);
    });
    return () => { cancelled = true; };
  }, [content]);
  const date = article?.publishedAt ? new Date(article.publishedAt).toISOString().slice(0, 16) : "";

  const formatContent = (before: string, after = before, fallback = "texte") => {
    const textarea = contentRef.current;
    if (!textarea) {
      setEditorMode("write");
      setContent((prev) => `${prev}${prev && !prev.endsWith("\n") ? "\n\n" : ""}${before}${fallback}${after}`);
      return;
    }
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.slice(start, end) || fallback;
    const next = `${content.slice(0, start)}${before}${selected}${after}${content.slice(end)}`;
    setContent(next);
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selected.length);
    });
  };

  const addLink = () => {
    const url = window.prompt("Adresse du lien", "https://");
    if (url) formatContent("[", `](${url})`, "texte du lien");
  };

  const [uploadingImage, setUploadingImage] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const insertImage = async (file: File) => {
    setUploadingImage(true);
    try {
      const body = new FormData();
      body.set("file", file);
      const response = await fetch("/admin/upload-image", { method: "POST", body });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Échec de l’envoi de l’image");
      formatContent(`![`, `](${result.url})`, "description de l’image");
    } catch (error) {
      window.alert(error instanceof Error ? error.message : "Échec de l’envoi de l’image");
    } finally {
      setUploadingImage(false);
    }
  };

  return <form action={formAction} className="article-editor">
    <div className="admin-form-grid">
      <label><span>Langue</span><select name="locale" defaultValue={article?.locale ?? "fr"}><option value="fr">Français</option><option value="en">English</option><option value="ar">العربية</option></select></label>
      <label><span>Statut</span><select name="status" defaultValue={article?.status ?? "DRAFT"}><option value="DRAFT">Brouillon</option><option value="PUBLISHED">Publié</option></select></label>
    </div>
    <label><span>Titre</span><input name="title" value={title} onChange={(event) => { const value = event.target.value; setTitle(value); if (!slugEdited) setSlug(slugify(value)); }} minLength={5} maxLength={180} required /></label>
    <label><span>Slug URL</span><div className="slug-input"><code>/blog/</code><input name="slug" value={slug} onChange={(event) => { setSlugEdited(true); setSlug(slugify(event.target.value)); }} pattern="[a-z0-9]+(?:-[a-z0-9]+)*" required /></div></label>
    <label><span>Résumé</span><textarea name="excerpt" rows={3} defaultValue={article?.excerpt} minLength={20} maxLength={320} placeholder="Une introduction claire qui donnera envie de lire l’article…" required /><small>Ce texte apparaît dans la liste des articles et les résultats de recherche.</small></label>
    <div className="content-editor-field"><div className="content-editor-label"><div><strong>Contenu de l’article</strong><span>Markdown assisté</span></div><div className="editor-tabs"><button type="button" className={editorMode === "write" ? "active" : ""} onClick={() => setEditorMode("write")}>Écrire</button><button type="button" className={editorMode === "preview" ? "active" : ""} onClick={() => setEditorMode("preview")}>Aperçu</button></div></div>
      <div className="markdown-toolbar" aria-label="Mise en forme"><button type="button" onClick={() => formatContent("## ", "", "Titre de section")} title="Titre 2">H2</button><button type="button" onClick={() => formatContent("### ", "", "Sous-titre")} title="Titre 3">H3</button><span /><button type="button" onClick={() => formatContent("**", "**")} title="Gras"><strong>B</strong></button><button type="button" onClick={() => formatContent("*", "*")} title="Italique"><em>I</em></button><button type="button" onClick={addLink} title="Ajouter un lien">↗ Lien</button><button type="button" onClick={() => imageInputRef.current?.click()} disabled={uploadingImage} title="Insérer une image">🖼 {uploadingImage ? "Envoi…" : "Image"}</button><span /><button type="button" onClick={() => formatContent("- ", "", "Élément de liste")} title="Liste">☷ Liste</button><button type="button" onClick={() => formatContent("> ", "", "Citation")} title="Citation">❝ Citation</button><button type="button" onClick={() => formatContent("\n---\n", "", "")} title="Séparateur">—</button></div>
      <input ref={imageInputRef} type="file" accept="image/jpeg,image/png,image/webp" hidden onChange={(event) => { const file = event.target.files?.[0]; event.target.value = ""; if (file) insertImage(file); }} />
      {editorMode === "write" ? <textarea ref={contentRef} name="content" className="markdown-editor" rows={24} value={content} onChange={(event) => setContent(event.target.value)} minLength={50} placeholder="Commencez à rédiger votre article ici…" required /> : <><input type="hidden" name="content" value={content} />{content ? <article className="markdown-preview" dangerouslySetInnerHTML={{ __html: previewHtml }} /> : <article className="markdown-preview"><p className="preview-placeholder">L’aperçu de votre article apparaîtra ici.</p></article>}</>}
      <div className="editor-help"><span>{content.trim().split(/\s+/).filter(Boolean).length} mots</span><span>Utilisez la barre d’outils pour mettre votre texte en forme.</span></div>
    </div>
    <div className="admin-form-grid">
      <label><span>Auteur</span><input name="author" defaultValue={article?.author ?? "AL MUMAYIZ"} required /></label>
      <label><span>Date de publication</span><input name="publishedAt" type="datetime-local" defaultValue={date} /></label>
    </div>
    <label><span>Image de couverture</span><input name="coverImage" type="file" accept="image/jpeg,image/png,image/webp" />{article?.coverImage && <small>Image actuelle : {article.coverImage}</small>}<input type="hidden" name="existingCoverImage" value={article?.coverImage ?? ""} /></label>
    <fieldset className="seo-fieldset"><legend>Référencement & partage</legend><div className="seo-fieldset-heading"><div><strong>Métadonnées de la page</strong><p>Ces informations sont réellement ajoutées dans la balise <code>&lt;head&gt;</code> de l’article.</p></div><span>SEO</span></div><label><span>Meta title</span><input name="seoTitle" defaultValue={article?.seoTitle ?? ""} maxLength={70} placeholder={title || "Titre affiché dans Google"} /><small>Idéalement entre 50 et 60 caractères. Le titre de l’article sera utilisé si ce champ reste vide.</small></label><label><span>Meta description</span><textarea name="seoDescription" rows={3} defaultValue={article?.seoDescription ?? ""} maxLength={170} placeholder="Résumé convaincant affiché dans les moteurs de recherche…" /><small>Idéalement entre 140 et 160 caractères.</small></label><div className="admin-form-grid"><label><span>Mots-clés</span><input name="seoKeywords" defaultValue={article?.seoKeywords ?? ""} maxLength={300} placeholder="chéchia en gros, fabricant, B2B" /><small>Séparez les expressions par des virgules.</small></label><label><span>URL canonique</span><input name="canonicalUrl" defaultValue={article?.canonicalUrl ?? ""} maxLength={500} placeholder="Automatique si laissé vide" /><small>À renseigner seulement si le contenu existe aussi sur une autre URL.</small></label></div><div className="serp-preview"><span>Aperçu dans Google</span><strong>{title || "Titre de votre article"}</strong><small>al-mumayiz.com › blog › {slug || "votre-article"}</small><p>La meta description personnalisée apparaîtra ici dans les résultats de recherche.</p></div></fieldset>
    <div className="admin-editor-actions"><button className="admin-primary" disabled={pending}>{pending ? "Enregistrement…" : "Enregistrer"}</button><p className="admin-error" aria-live="polite">{state.error}</p></div>
  </form>;
}
