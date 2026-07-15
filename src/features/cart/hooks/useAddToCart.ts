import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiClient } from '@/shared/api/api.interceptors';
import { API_URL } from '@/shared/config/api.config';

import { useCartStore } from '@/store/useCartStore';

import { CART_QUERY_KEY } from './useCart';

export const useAddToCart = () => {
   const queryClient = useQueryClient();
   const isAuth = useCartStore((state) => state.isAuth);
   const addLocalItem = useCartStore((state) => state.addItem);

   return useMutation({
      mutationFn: async ({
         productId,
         variantId,
         quantity,
      }: {
         productId: string;
         variantId: string;
         quantity: number;
      }) => {
         if (!isAuth) {
            addLocalItem(productId, variantId, quantity);
            return { isGuest: true };
         }

         return apiClient({
            url: API_URL.cart('quantity'),
            method: 'POST',
            data: { variantId, quantity: quantity },
         });
      },
      // Оптимистичный апдейт UI для авторизованного пользователя
      onSettled: (data) => {
         if (data && !('isGuest' in data)) {
            queryClient.invalidateQueries({
               queryKey: CART_QUERY_KEY,
               exact: false,
            });
         }
      },
   });
};
