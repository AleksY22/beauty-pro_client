import { useEffect } from 'react';

import { useProfile } from '@/shared/hooks/useProfile';

import { useCartStore } from '@/store/useCartStore';

import { useMergeCartMutation } from './useMergeCartMutation';

export function useCartSync() {
   const { user, isLoading } = useProfile();
   const setAuth = useCartStore((state) => state.setAuth);
   const clearCart = useCartStore((state) => state.clearCart);
   const localItems = useCartStore((state) => state.items);
   const { mutate: mergeCart } = useMergeCartMutation();

   useEffect(() => {
      if (isLoading) return;

      if (user) {
         setAuth(true);
         // Если гость накопил товары до логина — отправляем их на слияние в БД
         if (localItems.length > 0) {
            mergeCart(
               localItems.map(({ variantId, quantity }) => ({
                  variantId,
                  quantity,
               })),
            );
         }
      } else {
         // Пользователь вышел из системы или сессии нет
         setAuth(false);
         clearCart(); // Очищаем стейт для безопасности
      }
   }, [user, isLoading, setAuth, clearCart, mergeCart, localItems]);
}
