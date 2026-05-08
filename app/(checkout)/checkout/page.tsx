"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cartSubtotal, useCartStore } from "@/store/cartStore";
import { formatMoney } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const clearCart = () => useCartStore.getState().clear();

export default function CheckoutShippingPage() {
  const router = useRouter();
  const lines = useCartStore((s) => s.lines);
  const subtotal = cartSubtotal(lines);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (lines.length === 0) return;
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const payload = {
      customerName: String(fd.get("customerName")),
      customerEmail: String(fd.get("customerEmail")),
      customerPhone: String(fd.get("customerPhone")),
      shipStreet: String(fd.get("shipStreet")),
      shipNumber: String(fd.get("shipNumber")),
      shipInterior: String(fd.get("shipInterior") || ""),
      shipColonia: String(fd.get("shipColonia")),
      shipCity: String(fd.get("shipCity")),
      shipState: String(fd.get("shipState")),
      shipZip: String(fd.get("shipZip")),
      items: lines.map((l) => ({
        productId: l.productId,
        variantId: l.variantId ?? null,
        quantity: l.quantity,
        unitPrice: l.unitPrice,
        productName: l.name,
        imageUrl: l.imageUrl,
      })),
    };
    try {
      const res = await fetch("/api/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { orderId?: string };
      if (!res.ok) throw new Error();
      clearCart();
      router.push(`/checkout/confirmacion?id=${data.orderId ?? ""}`);
    } catch {
      setLoading(false);
      alert("No se pudo crear el pedido. Intenta de nuevo.");
    }
  }

  if (lines.length === 0) {
    return (
      <div className="px-6 py-12">
        <p>
          Tu carrito está vacío.{" "}
          <Link href="/boutique" className="text-primary underline">
            Boutique
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-12 px-6 py-12 lg:grid-cols-2 lg:px-12">
      <div>
        <p className="font-label text-[10px] uppercase tracking-[0.2em] text-primary">Paso 1</p>
        <h1 className="mt-2 font-headline text-3xl">Datos de envío</h1>
        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <input name="customerName" required placeholder="Nombre completo" className="w-full border border-outline-variant px-3 py-2 text-sm" />
          <input name="customerEmail" type="email" required placeholder="Email" className="w-full border border-outline-variant px-3 py-2 text-sm" />
          <input name="customerPhone" placeholder="Teléfono" className="w-full border border-outline-variant px-3 py-2 text-sm" />
          <input name="shipStreet" required placeholder="Calle" className="w-full border border-outline-variant px-3 py-2 text-sm" />
          <input name="shipNumber" required placeholder="Número exterior" className="w-full border border-outline-variant px-3 py-2 text-sm" />
          <input name="shipInterior" placeholder="Interior (opcional)" className="w-full border border-outline-variant px-3 py-2 text-sm" />
          <input name="shipColonia" required placeholder="Colonia" className="w-full border border-outline-variant px-3 py-2 text-sm" />
          <input name="shipCity" required placeholder="Ciudad" className="w-full border border-outline-variant px-3 py-2 text-sm" />
          <input name="shipState" required placeholder="Estado" className="w-full border border-outline-variant px-3 py-2 text-sm" />
          <input name="shipZip" required placeholder="C.P." className="w-full border border-outline-variant px-3 py-2 text-sm" />
          <Button type="submit" disabled={loading}>
            {loading ? "Procesando…" : "Confirmar pedido (pago pendiente)"}
          </Button>
          <p className="text-xs text-on-surface-variant">
            El cobro con tarjeta (Stripe) se integra en el paso siguiente cuando configures las claves en <code>.env</code>.
          </p>
        </form>
      </div>
      <aside className="border border-outline-variant/40 bg-surface-container-low p-8">
        <h2 className="font-headline text-xl">Resumen</h2>
        <ul className="mt-4 space-y-2 text-sm">
          {lines.map((l) => (
            <li key={`${l.productId}-${l.variantId ?? "x"}`} className="flex justify-between gap-4">
              <span>
                {l.name} × {l.quantity}
              </span>
              <span>{formatMoney(l.unitPrice * l.quantity)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex justify-between border-t border-outline-variant/30 pt-4 font-headline">
          <span>Total</span>
          <span>{formatMoney(subtotal)}</span>
        </div>
      </aside>
    </div>
  );
}
