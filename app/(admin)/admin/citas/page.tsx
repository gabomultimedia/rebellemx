import prisma from "@/lib/prisma";
import { formatMoney } from "@/lib/utils";

export default async function AdminCitasPage() {
  const citas = await prisma.appointment.findMany({
    orderBy: { date: "desc" },
    take: 100,
    include: { service: true, user: true },
  });

  return (
    <div>
      <h1 className="font-headline text-3xl text-white">Citas</h1>
      <ul className="mt-8 space-y-3 text-sm text-white/80">
        {citas.map((a) => (
          <li key={a.id} className="border border-white/10 p-4">
            <p className="font-headline text-white">{a.service.name}</p>
            <p className="mt-1 text-white/50">{new Date(a.date).toLocaleString("es-MX")}</p>
            <p className="mt-1">
              {a.clientName} · {a.status}
            </p>
            <p className="mt-1 text-[#D3AE6E]">{formatMoney(Number(a.price))}</p>
          </li>
        ))}
      </ul>
      {citas.length === 0 ? <p className="mt-8 text-white/40">Sin citas registradas.</p> : null}
    </div>
  );
}
