import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { BlogCategory, PostStatus } from "@prisma/client";

function isAdmin(role: string | undefined) {
  return role === "ADMIN" || role === "SUPERADMIN";
}

const categories = Object.values(BlogCategory);
const statuses = Object.values(PostStatus);

export async function POST(req: Request) {
  const session = await auth();
  if (!isAdmin(session?.user?.role)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const title = typeof body.title === "string" ? body.title.trim() : "";
  const slug = typeof body.slug === "string" ? body.slug.trim().toLowerCase() : "";
  if (!title) return NextResponse.json({ error: "Título requerido" }, { status: 400 });
  if (!slug) return NextResponse.json({ error: "Slug requerido" }, { status: 400 });

  const excerpt = typeof body.excerpt === "string" ? body.excerpt.trim() || null : null;
  const content = typeof body.content === "string" ? body.content : "";
  const coverImage = typeof body.coverImage === "string" ? body.coverImage.trim() || null : null;
  const authorName = typeof body.authorName === "string" ? body.authorName.trim() || "Editorial Rebelle" : "Editorial Rebelle";
  const metaTitle = typeof body.metaTitle === "string" ? body.metaTitle.trim() || null : null;
  const metaDesc = typeof body.metaDesc === "string" ? body.metaDesc.trim() || null : null;

  const category =
    typeof body.category === "string" && categories.includes(body.category as BlogCategory)
      ? (body.category as BlogCategory)
      : BlogCategory.TREND_ALERT;

  const status =
    typeof body.status === "string" && statuses.includes(body.status as PostStatus)
      ? (body.status as PostStatus)
      : PostStatus.DRAFT;

  const isFeatured = Boolean(body.isFeatured);

  let publishedAt: Date | null = null;
  if (body.publishedAt != null && typeof body.publishedAt === "string" && body.publishedAt.length > 0) {
    const d = new Date(body.publishedAt);
    if (!Number.isNaN(d.getTime())) publishedAt = d;
  } else if (status === PostStatus.PUBLISHED) {
    publishedAt = new Date();
  }

  const existing = await prisma.blogPost.findUnique({ where: { slug } });
  if (existing) return NextResponse.json({ error: "El slug ya existe" }, { status: 409 });

  if (isFeatured) {
    await prisma.blogPost.updateMany({ data: { isFeatured: false } });
  }

  const post = await prisma.blogPost.create({
    data: {
      title,
      slug,
      excerpt,
      content,
      coverImage,
      category,
      authorName,
      status,
      publishedAt,
      isFeatured,
      metaTitle,
      metaDesc,
    },
  });

  return NextResponse.json(post);
}
