import { isAdminAuthenticated } from "@/lib/admin-auth";
import { saveArticleImage } from "@/lib/article-images";

export async function POST(request: Request) {
  if (!await isAdminAuthenticated()) return Response.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!(file instanceof File)) return Response.json({ error: "Fichier manquant" }, { status: 400 });
    const url = await saveArticleImage(file);
    if (!url) return Response.json({ error: "Fichier vide" }, { status: 400 });
    return Response.json({ url }, { status: 201 });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Échec de l’envoi" }, { status: 400 });
  }
}
