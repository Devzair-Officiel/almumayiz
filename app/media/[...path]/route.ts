import { readFile } from "node:fs/promises";
import path from "node:path";

const MIME_TYPES: Record<string, string> = {
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
};

export async function GET(_request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const segments = (await params).path;
  if (segments.some((segment) => segment.includes("..") || segment.includes("/"))) {
    return new Response("Not found", { status: 404 });
  }
  const filePath = path.join(process.cwd(), "public", "uploads", ...segments);
  const contentType = MIME_TYPES[path.extname(filePath).toLowerCase()];
  if (!contentType) return new Response("Not found", { status: 404 });

  try {
    const buffer = await readFile(filePath);
    return new Response(buffer, {
      headers: { "Content-Type": contentType, "Cache-Control": "public, max-age=31536000, immutable" },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
