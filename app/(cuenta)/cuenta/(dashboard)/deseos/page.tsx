import Link from "next/link";
import Image from "next/image";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { formatMoney } from "@/lib/utils";
import { productDisplayImage } from "@/lib/store-images";

export default async function CuentaDeseosPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/cuenta/login");

  const items = await prisma.wishlistItem.findMany({
    where: { userId: session.user.id },
    include: { product: { include: { images: { take: 1 } } } },
  });

  return (
    <div>
      <h1 className="font-headline text-3xl">Lista de deseos</h1>
      <p className="mt-2 text-sm text-on-surface-variant">
        Sincronizado con tu cuenta. También puedes usar el ícono de favoritos en la boutique (local + cuenta al iniciar sesión).
      </p>
      <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {items.map((w) => {
          const thumb = productDisplayImage({
            slug: w.product.slug,
            name: w.product.name,
            images: w.product.images,
          });
          return (
            <li key={w.id} className="flex gap-4 border border-outline-variant/40 p-4">
              <div className="relative h-28 w-20 shrink-0 bg-surface-container">
                <Image src={thumb.src} alt={thumb.alt} fill className="object-cover" sizes="80px" />
              </div>
              <div>
                <Link href={`/boutique/${w.product.slug}`} className="font-headline hover:text-primary">
                  {w.product.name}
                </Link>
                <p className="mt-2 text-primary">{formatMoney(Number(w.product.price))}</p>
              </div>
            </li>
          );
        })}
      </ul>
      {items.length === 0 ? <p className="mt-8 text-on-surface-variant">Tu lista está vacía.</p> : null}
    </div>
  );
}
