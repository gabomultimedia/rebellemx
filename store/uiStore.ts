import { create } from "zustand";

type UiState = {
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  toggleCart: () => void;
};

export const useUiStore = create<UiState>((set) => ({
  cartOpen: false,
  setCartOpen: (open) => set({ cartOpen: open }),
  toggleCart: () => set((s) => ({ cartOpen: !s.cartOpen })),
}));
