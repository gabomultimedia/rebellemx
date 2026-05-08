import Link from "next/link";
import prisma from "@/lib/prisma";

type Props = { searchParams: Promise<{ id?: string }> };

export default async function ConfirmacionPage({ searchParams }: Props) {
  const { id } = await searchParams;
  const order = id
    ? await prisma.order.findUnique({
        where: { id },
        include: { items: true },
      })
    : null;

  return (
    <div className="px-6 py-16 text-center md:px-12">
      <p className="font-label text-[10px] uppercase tracking-[0.25em] text-primary">Gracias</p>
      <h1 className="mt-4 font-headline text-4xl">Pedido recibido</h1>
      {order ? (
        <p className="mt-4 text-on-surface-variant">
          Número de referencia: <span className="font-mono text-on-surface">{order.orderNumber}</span>
        </p>
      ) : (
        <p className="mt-4 text-on-surface-variant">Guarda el correo de confirmación cuando activemos el envío de emails.</p>
      )}
      <Link href="/boutique" className="mt-10 inline-block border-b border-primary pb-1 text-sm uppercase tracking-wider text-primary">
        Volver a la boutique
      </Link>
    </div>
  );
}
