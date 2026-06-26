import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { ICartItem } from '@/features/cart/types/cart.interface';

interface ICartState {
   items: ICartItem[];
   isAuth: boolean;
   setAuth: (isAuth: boolean) => void;
   addItem: (productId: string, variantId: string, quantity?: number) => void;
   removeItem: (variantId: string) => void;
   updateQuantity: (variantId: string, quantity: number) => void;
   setItems: (items: ICartItem[]) => void;
   clearCart: () => void;
}

export const useCartStore = create<ICartState>()(
   persist(
      (set, get) => ({
         items: [],
         isAuth: false,
         setAuth: (isAuth) => set({ isAuth }),

         addItem: (productId, variantId, quantity = 1) => {
            const items = get().items;
            const exists = items.find((i) => i.variantId === variantId);

            if (exists) {
               set({
                  items: items.map((i) =>
                     i.variantId === variantId
                        ? { ...i, quantity: i.quantity + quantity }
                        : i,
                  ),
               });
            } else {
               set({ items: [...items, { productId, variantId, quantity }] });
            }
         },
         removeItem: (variantId) => {
            set({
               items: get().items.filter((i) => i.variantId !== variantId),
            });
         },
         updateQuantity: (variantId, quantity) => {
            if (quantity <= 0) {
               set({
                  items: get().items.filter((i) => i.variantId !== variantId),
               });
               return;
            }
            set({
               items: get().items.map((i) =>
                  i.variantId === variantId ? { ...i, quantity } : i,
               ),
            });
         },
         setItems: (items) => set({ items }),
         clearCart: () => set({ items: [] }),
      }),
      {
         name: 'shopping-cart',
         partialize: (state) => ({ items: state.items }), // В localStorage пишем ТОЛЬКО items
      },
   ),
);
