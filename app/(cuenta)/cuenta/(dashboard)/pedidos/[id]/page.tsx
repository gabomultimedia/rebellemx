import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { formatMoney } from "@/lib/utils";

type Props = { params: Promise<{ id: string }> };

export default async function CuentaPedidoDetallePage({ params }: Props) {
  const session = await auth();
  if (!session?.user?.id) redirect("/cuenta/login");
  const { id } = await params;

  const order = await prisma.order.findFirst({
    where: { id, userId: session.user.id },
    include: { items: true, statusHistory: { orderBy: { createdAt: "desc" } } },
  });
  if (!order) notFound();

  return (
    <div>
      <Link href="/cuenta/pedidos" className="text-xs uppercase text-primary">
        ← Pedidos
      </Link>
      <h1 className="mt-4 font-headline text-3xl">Pedido</h1>
      <p className="mt-2 font-mono text-sm text-on-surface-variant">{order.orderNumber}</p>
      <p className="mt-4 text-sm">
        Estado: <strong>{order.status}</strong> · Pago: <strong>{order.paymentStatus}</strong>
      </p>
      <ul className="mt-8 space-y-4 border-t border-outline-variant/30 pt-8">
        {order.items.map((i) => (
          <li key={i.id} className="flex justify-between gap-4 text-sm">
            <span>
              {i.productName} × {i.quantity}
            </span>
            <span>{formatMoney(Number(i.subtotal))}</span>
          </li>
        ))}
      </ul>
      <p className="mt-6 font-headline text-xl">{formatMoney(Number(order.total))}</p>
    </div>
  );
}
