import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const categorySlug = searchParams.get("c") ?? undefined;
  const featured = searchParams.get("featured") === "1";

  const categoryId = categorySlug
    ? (await prisma.category.findUnique({ where: { slug: categorySlug } }))?.id
    : undefined;

  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      ...(categoryId ? { categoryId } : {}),
      ...(featured ? { isFeatured: true } : {}),
    },
    orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
    include: { images: { orderBy: { sortOrder: "asc" } }, category: true },
    take: 100,
  });

  return NextResponse.json(products);
}
