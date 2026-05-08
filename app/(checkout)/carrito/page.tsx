"use client";

import Image from "next/image";
import Link from "next/link";
import { cartSubtotal, useCartStore } from "@/store/cartStore";
import { formatMoney } from "@/lib/utils";

export default function CarritoPage() {
  const lines = useCartStore((s) => s.lines);
  const removeLine = useCartStore((s) => s.removeLine);
  const setQty = useCartStore((s) => s.setQty);
  const subtotal = cartSubtotal(lines);

  return (
    <div className="px-6 py-12 md:px-12">
      <div className="mx-auto max-w-[1000px]">
        <h1 className="font-headline text-3xl">Carrito</h1>
        {lines.length === 0 ? (
          <p className="mt-8 text-on-surface-variant">
            Vacío.{" "}
            <Link href="/boutique" className="text-primary underline">
              Ver boutique
            </Link>
          </p>
        ) : (
          <>
            <ul className="mt-10 space-y-8">
              {lines.map((l) => (
                <li key={`${l.productId}-${l.variantId ?? "x"}`} className="flex gap-6 border-b border-outline-variant/30 pb-8">
                  <div className="relative h-32 w-24 shrink-0 bg-surface-container">
                    {l.imageUrl ? <Image src={l.imageUrl} alt="" fill className="object-cover" sizes="96px" /> : null}
                  </div>
                  <div className="flex-1">
                    <Link href={`/boutique/${l.slug}`} className="font-headline text-lg hover:text-primary">
                      {l.name}
                    </Link>
                    <p className="mt-1 text-primary">{formatMoney(l.unitPrice)}</p>
                    <div className="mt-4 flex items-center gap-3">
                      <button type="button" className="border border-outline px-2" onClick={() => setQty(l.productId, l.quantity - 1, l.variantId)}>
                        −
                      </button>
                      <span>{l.quantity}</span>
                      <button type="button" className="border border-outline px-2" onClick={() => setQty(l.productId, l.quantity + 1, l.variantId)}>
                        +
                      </button>
                      <button type="button" className="ml-4 text-xs uppercase text-error" onClick={() => removeLine(l.productId, l.variantId)}>
                        Eliminar
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex justify-between border-t border-outline-variant/30 pt-8">
              <span className="font-headline text-xl">Subtotal</span>
              <span className="font-headline text-xl">{formatMoney(subtotal)}</span>
            </div>
            <Link
              href="/checkout"
              className="mt-8 inline-block bg-on-surface px-10 py-4 text-center font-label text-[11px] uppercase tracking-[0.15em] text-surface hover:bg-primary"
            >
              Continuar a envío
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
