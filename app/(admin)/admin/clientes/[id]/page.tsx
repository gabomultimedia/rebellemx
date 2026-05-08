import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";

type Props = { params: Promise<{ id: string }> };

export default async function AdminClienteDetallePage({ params }: Props) {
  const { id } = await params;
  const user = await prisma.user.findUnique({
    where: { id },
    include: { _count: { select: { orders: true, wishlist: true } } },
  });
  if (!user) notFound();

  return (
    <div>
      <Link href="/admin/clientes" className="text-xs uppercase text-[#D3AE6E]">
        ← Clientes
      </Link>
      <h1 className="mt-4 font-headline text-3xl text-white">{user.name ?? user.email}</h1>
      <p className="mt-2 text-sm text-white/50">{user.email}</p>
      <p className="mt-4 text-sm text-white/70">
        Pedidos: {user._count.orders} · Lista deseos: {user._count.wishlist}
      </p>
      <p className="mt-2 text-sm text-white/70">
        VIB: {user.vibLevel} · Puntos: {user.vibPoints}
      </p>
    </div>
  );
}
