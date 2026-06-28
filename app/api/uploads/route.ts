import { isApiAuthorized, unauthorizedResponse } from "@/lib/api-auth";
import { saveArticleImage } from "@/lib/article-images";

export async function POST(request: Request) {
  if (!isApiAuthorized(request)) return unauthorizedResponse();
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!(file instanceof File)) return Response.json({ error: "Missing file field" }, { status: 400 });
    const url = await saveArticleImage(file);
    return Response.json({ data: { url } }, { status: 201 });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Upload failed" }, { status: 400 });
  }
}
