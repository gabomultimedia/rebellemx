import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { BlogCategory, PostStatus, type Prisma } from "@prisma/client";

function isAdmin(role: string | undefined) {
  return role === "ADMIN" || role === "SUPERADMIN";
}

const categories = Object.values(BlogCategory);
const statuses = Object.values(PostStatus);

type Params = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, { params }: Params) {
  const session = await auth();
  if (!isAdmin(session?.user?.role)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  const { id } = await params;
  const current = await prisma.blogPost.findUnique({ where: { id } });
  if (!current) return NextResponse.json({ error: "No encontrado" }, { status: 404 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const data: Prisma.BlogPostUpdateInput = {};

  if (typeof body.title === "string") data.title = body.title.trim();
  if (typeof body.slug === "string") {
    const slug = body.slug.trim().toLowerCase();
    if (slug && slug !== current.slug) {
      const clash = await prisma.blogPost.findFirst({ where: { slug, NOT: { id } } });
      if (clash) return NextResponse.json({ error: "El slug ya existe" }, { status: 409 });
      data.slug = slug;
    }
  }
  if (typeof body.excerpt === "string") data.excerpt = body.excerpt.trim() || null;
  if (typeof body.content === "string") data.content = body.content;
  if (typeof body.coverImage === "string") data.coverImage = body.coverImage.trim() || null;
  if (typeof body.authorName === "string") data.authorName = body.authorName.trim() || "Editorial Rebelle";
  if (typeof body.metaTitle === "string") data.metaTitle = body.metaTitle.trim() || null;
  if (typeof body.metaDesc === "string") data.metaDesc = body.metaDesc.trim() || null;

  if (typeof body.category === "string" && categories.includes(body.category as BlogCategory)) {
    data.category = body.category as BlogCategory;
  }
  if (typeof body.status === "string" && statuses.includes(body.status as PostStatus)) {
    data.status = body.status as PostStatus;
  }
  if (typeof body.isFeatured === "boolean") data.isFeatured = body.isFeatured;

  if (body.publishedAt !== undefined) {
    if (body.publishedAt === null || body.publishedAt === "") {
      data.publishedAt = null;
    } else if (typeof body.publishedAt === "string") {
      const d = new Date(body.publishedAt);
      if (!Number.isNaN(d.getTime())) data.publishedAt = d;
    }
  }

  const nextStatus = (data.status as PostStatus | undefined) ?? current.status;
  if (data.publishedAt === undefined && nextStatus === PostStatus.PUBLISHED && !current.publishedAt) {
    data.publishedAt = new Date();
  }

  if (body.isFeatured === true) {
    await prisma.blogPost.updateMany({ where: { NOT: { id } }, data: { isFeatured: false } });
  }

  const post = await prisma.blogPost.update({
    where: { id },
    data,
  });

  return NextResponse.json(post);
}

export async function DELETE(_req: Request, { params }: Params) {
  const session = await auth();
  if (!isAdmin(session?.user?.role)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }
  const { id } = await params;
  try {
    await prisma.blogPost.delete({ where: { id } });
  } catch {
    return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
