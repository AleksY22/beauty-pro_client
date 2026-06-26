/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { CART_QUERY_KEY } from '../hooks/useCart';
import { useQueryClient } from '@tanstack/react-query';
import { useSyncExternalStore } from 'react';

import { useCartStore } from '@/store/useCartStore';

const SERVER_SNAPSHOT_EMPTY: any[] = [];

export function CartNum() {
   const queryClient = useQueryClient();

   const isAuth = useSyncExternalStore(
      useCartStore.subscribe,
      () => useCartStore.getState().isAuth,
      () => false,
   );
   const guestItems = useSyncExternalStore(
      useCartStore.subscribe,
      () => useCartStore.getState().items,
      () => SERVER_SNAPSHOT_EMPTY,
   );

   const serverItems = queryClient.getQueryData<any[]>(CART_QUERY_KEY) || [];

   const currentItems = isAuth ? serverItems : guestItems;
   const uniqueCount = currentItems.length;

   // Если корзина пуста, скрываем бейдж
   if (uniqueCount === 0) return null;

   // // Подсчитываем общее количество штук товаров в корзине
   // const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

   // // Если корзина пуста, скрываем круглый бейдж вообще
   // if (totalQuantity === 0) return null;

   return (
      <div className="absolute -top-1.5 -right-1.5 bg-red-300 text-white font-bold text-[11px] w-4 h-4 px-1 rounded-full flex items-center justify-center animate-fade-in shadow-sm pointer-events-none">
         {uniqueCount > 99 ? '99+' : uniqueCount}
      </div>
   );
}
