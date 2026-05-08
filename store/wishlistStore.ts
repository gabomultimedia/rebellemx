import { create } from "zustand";
import { persist } from "zustand/middleware";

type WishlistState = {
  productIds: string[];
  toggle: (productId: string) => void;
  has: (productId: string) => boolean;
};

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      productIds: [],
      toggle: (productId) => {
        const cur = get().productIds;
        if (cur.includes(productId)) {
          set({ productIds: cur.filter((id) => id !== productId) });
        } else {
          set({ productIds: [...cur, productId] });
        }
      },
      has: (productId) => get().productIds.includes(productId),
    }),
    { name: "rebelle-wishlist" },
  ),
);
