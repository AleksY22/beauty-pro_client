import { orderService } from '../services/order.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useUpdateOrderStatus = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: async ({
         orderId,
         status,
      }: {
         orderId: string;
         status: string;
      }) => {
         return orderService.updateStatusManual(orderId, status);
      },
      onSuccess: (data, variables) => {
         // Инвалидируем кэш конкретного заказа для мгновенного обновления страницы OrderInfo
         queryClient.invalidateQueries({
            queryKey: ['get order', variables.orderId],
         });
         // Инвалидируем общий список для таблицы DataTable в админке
         queryClient.invalidateQueries({ queryKey: ['admin orders'] });
      },
      onError() {
         toast.error('Ошибка при обновлении статуса заказа!');
      },
   });
};
