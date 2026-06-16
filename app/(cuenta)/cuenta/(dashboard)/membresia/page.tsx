import { customAuth } from "@/lib/custom-auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function MembresiaPage() {
  const session = await customAuth();
  if (!session?.user?.id) redirect("/cuenta/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { vibLevel: true, vibPoints: true },
  });

  const vib = await prisma.siteConfig.findUnique({ where: { key: "vib_threshold" } });
  const gold = await prisma.siteConfig.findUnique({ where: { key: "vib_gold_threshold" } });

  return (
    <div>
      <h1 className="font-headline text-3xl">Membresía VIB</h1>
      <p className="mt-4 text-on-surface-variant">
        Tu nivel actual: <strong>{user?.vibLevel}</strong>. Puntos acumulados: <strong>{user?.vibPoints}</strong>.
      </p>
      <p className="mt-6 text-sm text-on-surface-variant">
        Umbral VIB: {vib?.value ?? "—"} MXN acumulados · VIB Gold: {gold?.value ?? "—"} MXN.
      </p>
    </div>
  );
}
