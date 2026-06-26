import { useQueryClient } from '@tanstack/react-query';

import { useCartStore } from '@/store/useCartStore';

import { CART_QUERY_KEY } from './useCart';
import { useMergeCartMutation } from './useMergeCartMutation';

export const useAuthActions = () => {
   const queryClient = useQueryClient();

   // 1. Подключаем ранее созданную мутацию React Query для слияния корзины
   const { mutate: mergeCart, isPending: isMerging } = useMergeCartMutation();

   // 2. Достаем текущие гостевые товары из Zustand
   const localItems = useCartStore((state) => state.items);

   /**
    * Вызывается внутри onSubmit формы логина/верификации при успешном ответе сервера.
    * Бэкенд к этому моменту УЖЕ установил сессионную куку в браузер через Set-Cookie.
    */
   const handleAuthSuccess = () => {
      if (localItems.length > 0) {
         // Сценарий А: У гостя были товары -> Запускаем слияние корзин
         // Форматируем массив под ILocalCartItem[] (variantId и quantity)
         const formattedLocalItems = localItems.map(
            ({ variantId, quantity }) => ({
               variantId,
               quantity,
            }),
         );

         // Запускаем мутацию. Благодаря с Credentials: true в apiClient,
         // кука сессии прикрепится к запросу автоматически!
         mergeCart(formattedLocalItems);
      } else {
         // Сценарий Б: Гостевая корзина пуста -> Принудительно обновляем кэш React Query,
         // чтобы стянуть старую корзину этого юзера из БД (если она там была)
         queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
      }
   };

   return {
      handleAuthSuccess,
      isMerging,
   };
};
