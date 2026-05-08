import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function CuentaPerfilPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/cuenta/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      name: true,
      email: true,
      phone: true,
      vibLevel: true,
      vibPoints: true,
      sizeTop: true,
      sizePants: true,
      sizeShoes: true,
    },
  });

  return (
    <div>
      <h1 className="font-headline text-3xl">Perfil</h1>
      <dl className="mt-8 space-y-4 text-sm">
        <div>
          <dt className="text-on-surface-variant">Nombre</dt>
          <dd className="mt-1">{user?.name ?? "—"}</dd>
        </div>
        <div>
          <dt className="text-on-surface-variant">Email</dt>
          <dd className="mt-1">{user?.email}</dd>
        </div>
        <div>
          <dt className="text-on-surface-variant">Teléfono</dt>
          <dd className="mt-1">{user?.phone ?? "—"}</dd>
        </div>
        <div>
          <dt className="text-on-surface-variant">Nivel VIB</dt>
          <dd className="mt-1">{user?.vibLevel}</dd>
        </div>
        <div>
          <dt className="text-on-surface-variant">Puntos</dt>
          <dd className="mt-1">{user?.vibPoints}</dd>
        </div>
        <div>
          <dt className="text-on-surface-variant">Tallas</dt>
          <dd className="mt-1">
            {user?.sizeTop ?? "—"} / {user?.sizePants ?? "—"} / {user?.sizeShoes ?? "—"}
          </dd>
        </div>
      </dl>
    </div>
  );
}
