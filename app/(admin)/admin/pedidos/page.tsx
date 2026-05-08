import Link from "next/link";
import prisma from "@/lib/prisma";
import { formatMoney } from "@/lib/utils";

export default async function AdminPedidosPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div>
      <h1 className="font-headline text-3xl text-white">Pedidos</h1>
      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm text-white/80">
          <thead className="border-b border-white/10 text-[10px] uppercase tracking-wider text-white/40">
            <tr>
              <th className="pb-3">Ref</th>
              <th className="pb-3">Cliente</th>
              <th className="pb-3">Total</th>
              <th className="pb-3">Estado</th>
              <th className="pb-3">Pago</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-b border-white/5">
                <td className="py-3 font-mono text-xs">
                  <Link href={`/admin/pedidos/${o.id}`} className="hover:text-[#D3AE6E]">
                    {o.orderNumber.slice(0, 8)}…
                  </Link>
                </td>
                <td className="py-3">{o.customerName}</td>
                <td className="py-3">{formatMoney(Number(o.total))}</td>
                <td className="py-3">{o.status}</td>
                <td className="py-3">{o.paymentStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
