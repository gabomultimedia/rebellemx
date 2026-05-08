import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { formatMoney } from "@/lib/utils";

type Props = { params: Promise<{ id: string }> };

export default async function AdminProductoDetallePage({ params }: Props) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true, images: true },
  });
  if (!product) notFound();

  return (
    <div>
      <Link href="/admin/productos" className="text-xs uppercase text-[#D3AE6E]">
        ← Productos
      </Link>
      <h1 className="mt-4 font-headline text-3xl text-white">{product.name}</h1>
      <p className="mt-2 text-sm text-white/50">Slug: {product.slug}</p>
      <p className="mt-4 text-[#D3AE6E]">{formatMoney(Number(product.price))}</p>
      <p className="mt-4 text-sm text-white/70">Stock: {product.stock}</p>
      <p className="mt-2 text-sm text-white/50 whitespace-pre-wrap">{product.description}</p>
    </div>
  );
}
