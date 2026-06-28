import { isApiAuthorized, unauthorizedResponse } from "@/lib/api-auth";
import { articleSchema } from "@/lib/articles";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!isApiAuthorized(request)) return unauthorizedResponse();
  const url = new URL(request.url);
  const locale = url.searchParams.get("locale");
  const status = url.searchParams.get("status");
  const limit = Math.min(Math.max(Number(url.searchParams.get("limit") ?? 50), 1), 100);
  const articles = await prisma.article.findMany({
    where: {
      ...(locale ? { locale } : {}),
      ...(status === "DRAFT" || status === "PUBLISHED" ? { status } : {}),
    },
    orderBy: { updatedAt: "desc" },
    take: limit,
  });
  return Response.json({ data: articles });
}

export async function POST(request: Request) {
  if (!isApiAuthorized(request)) return unauthorizedResponse();
  try {
    const parsed = articleSchema.parse(await request.json());
    const data = { ...parsed, publishedAt: parsed.status === "PUBLISHED" ? (parsed.publishedAt ?? new Date()) : null };
    const article = await prisma.article.create({ data });
    return Response.json({ data: article }, { status: 201 });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Invalid article" }, { status: 400 });
  }
}
