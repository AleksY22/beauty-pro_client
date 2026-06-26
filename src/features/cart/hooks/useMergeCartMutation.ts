/* eslint-disable @typescript-eslint/no-explicit-any */
// Импортируем ключ кэша из основного хука корзины
import type { ICartItemResponse } from '../services/cart.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiClient } from '@/shared/api/api.interceptors';
import { API_URL } from '@/shared/config/api.config';

import { useCartStore } from '@/store/useCartStore';

import { CART_QUERY_KEY } from './useCart';

export const useMergeCartMutation = () => {
   const queryClient = useQueryClient();
   const setItems = useCartStore((state) => state.setItems);
   const setAuth = useCartStore((state) => state.setAuth);

   return useMutation({
      mutationFn: async (
         localItems: { variantId: string; quantity: number }[],
      ) => {
         const response = await apiClient<ICartItemResponse[]>({
            url: API_URL.cart('merge'),
            method: 'POST',
            data: { localItems },
         });

         return (response as any).data || response;
      },
      onSuccess: (serverCart: ICartItemResponse[]) => {
         // 1. Обновляем кэш React Query полученными данными от бэкенда
         queryClient.setQueryData(CART_QUERY_KEY, serverCart);

         // 2. Инвалидируем кэш, чтобы гарантировать актуальность данных (цены, остатки на складе)
         queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });

         setAuth(true);

         // 4. Перезаписываем Zustand, чтобы локальный стейт полностью соответствовал БД
         setItems(
            serverCart.map((i) => ({
               productId: i.variant.productId,
               variantId: i.variantId,
               quantity: i.quantity,
            })),
         );
      },
      onError: (error) => {
         console.error('Ошибка при синхронизации корзины:', error);
      },
   });
};
