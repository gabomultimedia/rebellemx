import { customAuth } from "@/lib/custom-auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { formatMoney } from "@/lib/utils";

export default async function CuentaCitasPage() {
  const session = await customAuth();
  if (!session?.user?.id) redirect("/cuenta/login");

  const citas = await prisma.appointment.findMany({
    where: { userId: session.user.id },
    include: { service: true },
    orderBy: { date: "desc" },
  });

  return (
    <div>
      <h1 className="font-headline text-3xl">Citas</h1>
      <ul className="mt-8 space-y-4">
        {citas.map((a) => (
          <li key={a.id} className="border border-outline-variant/40 p-4 text-sm">
            <p className="font-headline">{a.service.name}</p>
            <p className="mt-2 text-on-surface-variant">{new Date(a.date).toLocaleString("es-MX")}</p>
            <p className="mt-1">{a.status}</p>
            <p className="mt-1 text-primary">{formatMoney(Number(a.price))}</p>
          </li>
        ))}
      </ul>
      {citas.length === 0 ? (
        <p className="mt-8 text-on-surface-variant">No hay citas. Agenda vía Contacto o Concierge.</p>
      ) : null}
    </div>
  );
}
