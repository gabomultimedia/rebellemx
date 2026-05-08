import Link from "next/link";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { formatMoney } from "@/lib/utils";

export default async function CuentaPedidosPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/cuenta/login");

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <div>
      <h1 className="font-headline text-3xl">Pedidos</h1>
      <ul className="mt-8 space-y-4">
        {orders.map((o) => (
          <li key={o.id} className="border border-outline-variant/40 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-mono text-sm">{o.orderNumber}</span>
              <span className="text-xs uppercase text-on-surface-variant">{o.status}</span>
            </div>
            <p className="mt-2 text-sm text-on-surface-variant">{formatMoney(Number(o.total))}</p>
            <Link href={`/cuenta/pedidos/${o.id}`} className="mt-2 inline-block text-xs uppercase text-primary">
              Ver detalle
            </Link>
          </li>
        ))}
      </ul>
      {orders.length === 0 ? <p className="mt-8 text-on-surface-variant">Aún no tienes pedidos.</p> : null}
    </div>
  );
}
