"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useUiStore } from "@/store/uiStore";
import { cn } from "@/lib/utils";

type Variant = {
  id: string;
  name: string;
  value: string;
  stock: number;
  priceAdj: unknown;
};

type Props = {
  productId: string;
  slug: string;
  name: string;
  imageUrl: string | null;
  basePrice: number;
  stock: number;
  variants: Variant[];
};

function groupByName(variants: Variant[]) {
  const m = new Map<string, Variant[]>();
  for (const v of variants) {
    const arr = m.get(v.name) ?? [];
    arr.push(v);
    m.set(v.name, arr);
  }
  return m;
}

export function ProductDetailPurchase({ productId, slug, name, imageUrl, basePrice, stock, variants }: Props) {
  const addLine = useCartStore((s) => s.addLine);
  const setCartOpen = useUiStore((s) => s.setCartOpen);
  const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "526641234567";
  const waMsg = encodeURIComponent(`Hola, consulto por: ${name}`);
  const waHref = `https://wa.me/${wa}?text=${waMsg}`;

  const grouped = useMemo(() => groupByName(variants), [variants]);
  const names = useMemo(() => Array.from(grouped.keys()), [grouped]);

  const defaultVariant =
    variants.find((v) => v.stock > 0) ?? variants[0] ?? null;
  const [selectedId, setSelectedId] = useState<string | null>(defaultVariant?.id ?? null);

  const selected = variants.find((v) => v.id === selectedId) ?? defaultVariant;
  const adj = selected?.priceAdj != null ? Number(selected.priceAdj) : 0;
  const unitPrice = basePrice + adj;
  const effectiveStock = selected ? selected.stock : stock;
  const canAdd = effectiveStock > 0;

  const handleAdd = () => {
    if (!canAdd) return;
    addLine({
      productId,
      slug,
      name,
      imageUrl,
      unitPrice,
      variantId: selected?.id ?? null,
      variantLabel: selected ? `${selected.name}: ${selected.value}` : null,
    });
    setCartOpen(true);
  };

  return (
    <div className="space-y-10">
      {variants.length > 0 && names.length === 1 ? (
        <div>
          <div className="mb-4 flex items-center justify-between">
            <span className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">{names[0]}</span>
            <Link
              href="/contacto"
              className="border-b border-primary/30 font-label text-[10px] uppercase tracking-[0.2em] text-primary transition-all hover:border-primary"
            >
              Guía de tallas
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {(grouped.get(names[0]) ?? []).map((v) => (
              <button
                key={v.id}
                type="button"
                disabled={v.stock <= 0}
                onClick={() => setSelectedId(v.id)}
                className={cn(
                  "border border-outline-variant py-3 text-xs uppercase tracking-widest transition-colors hover:border-primary",
                  selectedId === v.id && "border-primary bg-primary/5",
                  v.stock <= 0 && "cursor-not-allowed opacity-40",
                )}
              >
                {v.value}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {variants.length > 0 && names.length > 1 ? (
        <div>
          <span className="mb-4 block font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">Selección</span>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            {variants.map((v) => (
              <button
                key={v.id}
                type="button"
                disabled={v.stock <= 0}
                onClick={() => setSelectedId(v.id)}
                className={cn(
                  "border border-outline-variant py-3 text-left text-[11px] uppercase tracking-widest transition-colors hover:border-primary",
                  selectedId === v.id && "border-primary bg-primary/5",
                  v.stock <= 0 && "cursor-not-allowed opacity-40",
                )}
              >
                <span className="block px-2">
                  {v.name}: {v.value}
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {variants.length === 0 ? (
        <p className="text-sm text-on-surface-variant">{stock > 0 ? `${stock} disponibles` : "Agotado"}</p>
      ) : (
        <p className="text-sm text-on-surface-variant">{effectiveStock > 0 ? `${effectiveStock} disponibles` : "Agotado"}</p>
      )}

      <div className="space-y-4">
        <button
          type="button"
          disabled={!canAdd}
          onClick={handleAdd}
          className="group flex w-full items-center justify-center gap-4 bg-on-surface py-5 font-bold uppercase tracking-[0.2em] text-surface transition-all hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span>Agregar a mi Armadura</span>
          <ArrowRight className="h-5 w-5 text-primary-fixed transition-transform group-hover:translate-x-1" strokeWidth={1.25} />
        </button>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 border border-primary py-5 font-bold uppercase tracking-[0.2em] text-primary transition-all hover:bg-primary/5"
        >
          <MessageCircle className="h-5 w-5" strokeWidth={1.25} />
          <span>Consultar por WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
