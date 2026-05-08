import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function AdminClientesPage() {
  const clients = await prisma.user.findMany({
    where: { role: "CLIENT" },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div>
      <h1 className="font-headline text-3xl text-white">Clientes</h1>
      <ul className="mt-8 space-y-2 text-sm text-white/80">
        {clients.map((u) => (
          <li key={u.id} className="flex justify-between border-b border-white/5 py-3">
            <span>{u.name ?? u.email}</span>
            <Link href={`/admin/clientes/${u.id}`} className="text-[#D3AE6E] hover:underline">
              Ver
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
