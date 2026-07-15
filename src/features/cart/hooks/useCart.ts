/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ICartItemResponse } from '../services/cart.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { apiClient } from '@/shared/api/api.interceptors';
import { API_URL } from '@/shared/config/api.config';

import { useCartStore } from '@/store/useCartStore';

// Ключ кэша для корзины
export const CART_QUERY_KEY = ['cart'];

// 1. Хук получения актуальных данных корзины из БД
export const useCartQuery = () => {
   const isAuth = useCartStore((state) => state.isAuth);
   const guestItems = useCartStore((state) => state.items);
   const variantIds = guestItems.map((i) => i.variantId);

   return useQuery<ICartItemResponse[]>({
      queryKey: [...CART_QUERY_KEY, isAuth, variantIds],
      queryFn: async () => {
         if (isAuth) {
            // Для авторизованного пользователя
            const response = await apiClient<ICartItemResponse[]>({
               url: API_URL.cart(''),
               method: 'GET',
            });
            return (response as any).data || response;
         }

         // Если гость и корзина пуста — возвращаем пустой массив сразу, без запроса к API
         if (!isAuth && variantIds.length === 0) {
            return [];
         }

         // Для гостя — отправляем запрос на публичный эндпоинт
         const response = await apiClient<ICartItemResponse[]>({
            url: API_URL.cart('local-details'),
            method: 'POST',
            data: { variantIds },
         });
         const serverData = (response as any).data || response;

         return serverData.map((item: any) => ({
            ...item,
            quantity:
               guestItems.find((i) => i.variantId === item.variantId)
                  ?.quantity || 1,
         }));
      },
      enabled: true,
      staleTime: 1000 * 60 * 5, // Кэшируем данные на 5 минут
   });
};

// 2. Мутация для обновления количества товара
export const useUpdateQuantityMutation = () => {
   const queryClient = useQueryClient();
   const isAuth = useCartStore((state) => state.isAuth);
   const updateLocalQuantity = useCartStore((state) => state.updateQuantity);

   return useMutation({
      mutationFn: async ({
         variantId,
         quantity,
      }: {
         variantId: string;
         quantity: number;
      }) => {
         if (!isAuth) {
            updateLocalQuantity(variantId, quantity);
            return { isGuest: true };
         }
         return apiClient({
            url: API_URL.cart('quantity'),
            method: 'POST',
            data: { variantId, quantity },
         });
      },
      // Оптимистичный апдейт: меняем стейт в кэше React Query до завершения запроса
      onMutate: async ({ variantId, quantity }) => {
         // Отменяем любые запросы, начинающиеся с ['cart']
         await queryClient.cancelQueries({
            queryKey: CART_QUERY_KEY,
            exact: false,
         });

         // Для гостя оптимистичный апдейт в кеш больше делать не нужно,
         // так как изменение variantIds теперь САМО триггерит обновление queryFn!
         if (!isAuth) return;

         const previousCart =
            queryClient.getQueryData<ICartItemResponse[]>(CART_QUERY_KEY);

         if (previousCart) {
            queryClient.setQueryData<ICartItemResponse[]>(
               CART_QUERY_KEY,
               previousCart.map((item) =>
                  item.variantId === variantId ? { ...item, quantity } : item,
               ),
            );
         }

         return { previousCart };
      },
      // Если бэкенд вернул ошибку — откатываем кэш и Zustand к старым значениям
      onError: (err, vars, ctx) => {
         if (ctx?.previousCart && isAuth)
            queryClient.setQueryData(CART_QUERY_KEY, ctx.previousCart);
      },
      // В случае успеха или ошибки обновляем кэш свежими данными с сервера
      onSettled: () => {
         queryClient.invalidateQueries({
            queryKey: CART_QUERY_KEY,
            exact: false,
         });
      },
   });
};

// 3. Мутация для удаления товара из корзины
export const useRemoveItemMutation = () => {
   const queryClient = useQueryClient();
   const isAuth = useCartStore((state) => state.isAuth);
   const removeLocalItem = useCartStore((state) => state.removeItem);

   return useMutation({
      mutationFn: async (variantId: string) => {
         if (!isAuth) {
            removeLocalItem(variantId);
            return { isGuest: true };
         }
         return apiClient({
            url: `${API_URL.cart('item')}/${variantId}`,
            method: 'DELETE',
         });
      },
      onMutate: async (variantId) => {
         // Отменяем любые запросы, начинающиеся с ['cart']
         await queryClient.cancelQueries({
            queryKey: CART_QUERY_KEY,
            exact: false,
         });

         if (!isAuth) return;

         const previousCart =
            queryClient.getQueryData<ICartItemResponse[]>(CART_QUERY_KEY);

         if (previousCart) {
            queryClient.setQueryData<ICartItemResponse[]>(
               CART_QUERY_KEY,
               previousCart.filter((item) => item.variantId !== variantId),
            );
         }
         return { previousCart };
      },
      onError: (err, id, ctx) => {
         if (ctx?.previousCart && isAuth)
            queryClient.setQueryData(CART_QUERY_KEY, ctx.previousCart);
      },
      onSettled: () => {
         // Инвалидируем все запросы с префиксом ['cart']
         queryClient.invalidateQueries({
            queryKey: CART_QUERY_KEY,
            exact: false,
         });
      },
   });
};
