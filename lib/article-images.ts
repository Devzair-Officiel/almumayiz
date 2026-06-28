import "server-only";

import { mkdir, unlink } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import sharp from "sharp";

const MAX_IMAGE_SIZE = 8 * 1024 * 1024;
const uploadDirectory = () => path.join(process.cwd(), "public/uploads/articles");

export async function saveArticleImage(file: File) {
  if (!file.size) return null;
  if (file.size > MAX_IMAGE_SIZE) throw new Error("L’image ne doit pas dépasser 8 Mo");
  if (!file.type.startsWith("image/")) throw new Error("Le fichier doit être une image");

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${Date.now()}-${randomUUID()}.webp`;
  const directory = uploadDirectory();
  await mkdir(directory, { recursive: true });

  await sharp(buffer, { failOn: "warning" })
    .rotate()
    .resize(1600, 900, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: 84, effort: 5 })
    .toFile(path.join(directory, filename));

  return `/uploads/articles/${filename}`;
}

export async function removeArticleImage(publicPath: string | null | undefined) {
  if (!publicPath?.startsWith("/uploads/articles/")) return;
  const filename = path.basename(publicPath);
  try { await unlink(path.join(uploadDirectory(), filename)); } catch { /* Already absent. */ }
}
