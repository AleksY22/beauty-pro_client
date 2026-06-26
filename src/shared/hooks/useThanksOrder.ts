'use client';

import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import { orderService } from '@/features/order/services/order.service';

export const useThanksOrder = () => {
   const searchParams = useSearchParams();
   const orderId = searchParams.get('orderId');

   const {
      data: order,
      isLoading,
      error,
   } = useQuery({
      queryKey: ['thanks_order', orderId],
      queryFn: () => {
         if (!orderId) throw new Error('ID заказа не указан');
         return orderService.getById(orderId);
      },
      enabled: !!orderId,
      retry: false,
      staleTime: 1000 * 60 * 5,
   });

   return {
      order,
      isLoading: isLoading || !orderId,
      error,
   };
};
