import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { formatMoney } from "@/lib/utils";

type Props = { params: Promise<{ id: string }> };

export default async function AdminPedidoDetallePage({ params }: Props) {
  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: true, statusHistory: { orderBy: { createdAt: "desc" } } },
  });
  if (!order) notFound();

  return (
    <div>
      <Link href="/admin/pedidos" className="text-xs uppercase text-[#D3AE6E]">
        ← Pedidos
      </Link>
      <h1 className="mt-4 font-headline text-3xl text-white">Pedido</h1>
      <p className="mt-2 font-mono text-sm text-white/50">{order.orderNumber}</p>
      <p className="mt-4 text-sm text-white/70">
        {order.customerName} · {order.customerEmail}
      </p>
      <ul className="mt-8 space-y-2 border-t border-white/10 pt-8 text-sm">
        {order.items.map((i) => (
          <li key={i.id} className="flex justify-between gap-4">
            <span>
              {i.productName} × {i.quantity}
            </span>
            <span>{formatMoney(Number(i.subtotal))}</span>
          </li>
        ))}
      </ul>
      <p className="mt-6 font-headline text-xl text-[#D3AE6E]">{formatMoney(Number(order.total))}</p>
      <div className="mt-8 text-xs text-white/40">
        {order.statusHistory.map((h) => (
          <p key={h.id}>
            {h.status} — {new Date(h.createdAt).toLocaleString("es-MX")}
          </p>
        ))}
      </div>
    </div>
  );
}
