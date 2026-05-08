import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartLine = {
  productId: string;
  slug: string;
  name: string;
  imageUrl: string | null;
  unitPrice: number;
  quantity: number;
  variantId?: string | null;
  variantLabel?: string | null;
};

type CartState = {
  lines: CartLine[];
  addLine: (line: Omit<CartLine, "quantity"> & { quantity?: number }) => void;
  removeLine: (productId: string, variantId?: string | null) => void;
  setQty: (productId: string, quantity: number, variantId?: string | null) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      addLine: (line) => {
        const qty = line.quantity ?? 1;
        const key = (v: CartLine) =>
          v.productId === line.productId && (v.variantId ?? null) === (line.variantId ?? null);
        const existing = get().lines.find(key);
        if (existing) {
          set({
            lines: get().lines.map((l) =>
              key(l) ? { ...l, quantity: l.quantity + qty } : l,
            ),
          });
        } else {
          set({ lines: [...get().lines, { ...line, quantity: qty }] });
        }
      },
      removeLine: (productId, variantId) => {
        set({
          lines: get().lines.filter(
            (l) => !(l.productId === productId && (l.variantId ?? null) === (variantId ?? null)),
          ),
        });
      },
      setQty: (productId, quantity, variantId) => {
        if (quantity <= 0) {
          get().removeLine(productId, variantId);
          return;
        }
        set({
          lines: get().lines.map((l) =>
            l.productId === productId && (l.variantId ?? null) === (variantId ?? null)
              ? { ...l, quantity }
              : l,
          ),
        });
      },
      clear: () => set({ lines: [] }),
    }),
    { name: "rebelle-cart" },
  ),
);

export function cartSubtotal(lines: CartLine[]) {
  return lines.reduce((acc, l) => acc + l.unitPrice * l.quantity, 0);
}
