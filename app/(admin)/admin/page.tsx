import prisma from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [products, orders, appointments, users] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.appointment.count(),
    prisma.user.count({ where: { role: "CLIENT" } }),
  ]);

  const cards = [
    { label: "Productos", value: products },
    { label: "Pedidos", value: orders },
    { label: "Citas", value: appointments },
    { label: "Clientes", value: users },
  ];

  return (
    <div>
      <h1 className="font-headline text-3xl text-white">Dashboard</h1>
      <p className="mt-2 text-sm text-white/50">Métricas en vivo desde la base de datos.</p>
      <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="border border-white/10 bg-white/[0.03] p-6">
            <p className="font-label text-[10px] uppercase tracking-[0.2em] text-[#D3AE6E]">{c.label}</p>
            <p className="mt-4 font-headline text-4xl text-white">{c.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
