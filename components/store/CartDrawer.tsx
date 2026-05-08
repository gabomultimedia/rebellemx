"use client";

import Link from "next/link";
import Image from "next/image";
import { useUiStore } from "@/store/uiStore";
import { cartSubtotal, useCartStore } from "@/store/cartStore";
import { formatMoney } from "@/lib/utils";

export function CartDrawer() {
  const open = useUiStore((s) => s.cartOpen);
  const setOpen = useUiStore((s) => s.setCartOpen);
  const lines = useCartStore((s) => s.lines);
  const removeLine = useCartStore((s) => s.removeLine);
  const setQty = useCartStore((s) => s.setQty);
  const subtotal = cartSubtotal(lines);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        aria-label="Cerrar carrito"
        onClick={() => setOpen(false)}
      />
      <aside className="relative flex h-full w-full max-w-md flex-col bg-surface-container-lowest shadow-xl">
        <div className="flex items-center justify-between border-b border-outline-variant/30 px-6 py-4">
          <h2 className="font-headline text-lg">Tu selección</h2>
          <button type="button" className="text-sm uppercase tracking-wider text-on-surface-variant" onClick={() => setOpen(false)}>
            Cerrar
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {lines.length === 0 ? (
            <p className="text-sm text-on-surface-variant">El carrito está vacío.</p>
          ) : (
            <ul className="space-y-6">
              {lines.map((l) => (
                <li key={`${l.productId}-${l.variantId ?? "x"}`} className="flex gap-4">
                  <div className="relative h-24 w-20 shrink-0 bg-surface-container">
                    {l.imageUrl ? (
                      <Image src={l.imageUrl} alt="" fill className="object-cover" sizes="80px" />
                    ) : null}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-headline text-sm">{l.name}</p>
                    {l.variantLabel ? (
                      <p className="text-xs text-on-surface-variant">{l.variantLabel}</p>
                    ) : null}
                    <p className="mt-1 text-sm text-primary">{formatMoney(l.unitPrice)}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        className="border border-outline px-2 text-sm"
                        onClick={() => setQty(l.productId, l.quantity - 1, l.variantId)}
                      >
                        −
                      </button>
                      <span className="text-sm">{l.quantity}</span>
                      <button
                        type="button"
                        className="border border-outline px-2 text-sm"
                        onClick={() => setQty(l.productId, l.quantity + 1, l.variantId)}
                      >
                        +
                      </button>
                      <button
                        type="button"
                        className="ml-auto text-xs uppercase tracking-wider text-error"
                        onClick={() => removeLine(l.productId, l.variantId)}
                      >
                        Quitar
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="border-t border-outline-variant/30 px-6 py-4">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span className="font-medium">{formatMoney(subtotal)}</span>
          </div>
          <Link
            href="/checkout"
            onClick={() => setOpen(false)}
            className="mt-4 block w-full bg-on-surface py-4 text-center text-[11px] font-label uppercase tracking-[0.15em] text-surface hover:bg-primary"
          >
            Ir a checkout
          </Link>
          <Link
            href="/carrito"
            onClick={() => setOpen(false)}
            className="mt-2 block text-center text-xs text-on-surface-variant underline"
          >
            Ver carrito completo
          </Link>
        </div>
      </aside>
    </div>
  );
}
