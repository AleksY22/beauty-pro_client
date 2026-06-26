import { TypeOrderRequestData, orderService } from '../services/order.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { toast } from 'sonner';

import { useCartStore } from '@/store/useCartStore';

import { CART_QUERY_KEY } from '@/features/cart/hooks/useCart';

export const useCheckout = () => {
   const router = useRouter();
   const queryClient = useQueryClient();

   const clearLocalCart = useCartStore((state) => state.clearCart);

   const {
      mutate: createPayment,
      isPending: isLoadingCreate,
      error: errorCreate,
   } = useMutation({
      mutationKey: ['create order'],
      mutationFn: (data: TypeOrderRequestData) => orderService.checkout(data),
      onSuccess({ data }) {
         clearLocalCart();

         // Обнуляем кэш корзины в React Query, чтобы шапка сайта обновилась (стала пустой)
         queryClient.setQueryData(CART_QUERY_KEY, []);

         // Если бэкенд вернул URL ЮKassa — редиректим на шлюз оплаты
         if (data.paymentUrl) {
            window.location.href = data.paymentUrl;
         } else {
            // Если выбран CASH / ERIP — отправляем на страницу "Спасибо"
            router.push(`/thanks?orderId=${data.orderId}`);
         }
      },
      onError() {
         toast.error('Ошибка при оформлении заказа!');
      },
   });

   return useMemo(
      () => ({ createPayment, isLoadingCreate, errorCreate }),
      [createPayment, isLoadingCreate, errorCreate],
   );
};
