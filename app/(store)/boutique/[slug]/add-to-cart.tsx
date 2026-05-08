"use client";

import { useCartStore } from "@/store/cartStore";
import { useUiStore } from "@/store/uiStore";
import { formatMoney } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

type Props = {
  productId: string;
  slug: string;
  name: string;
  imageUrl: string | null;
  unitPrice: number;
  stock: number;
};

export function AddToCartSection({ productId, slug, name, imageUrl, unitPrice, stock }: Props) {
  const addLine = useCartStore((s) => s.addLine);
  const setCartOpen = useUiStore((s) => s.setCartOpen);

  return (
    <div className="mt-10 space-y-4 border-t border-outline-variant/30 pt-10">
      <p className="text-sm text-on-surface-variant">{stock > 0 ? `${stock} disponibles` : "Agotado"}</p>
      <Button
        type="button"
        disabled={stock <= 0}
        onClick={() => {
          addLine({ productId, slug, name, imageUrl, unitPrice });
          setCartOpen(true);
        }}
        className="w-full md:w-auto"
      >
        Añadir al carrito — {formatMoney(unitPrice)}
      </Button>
    </div>
  );
}
