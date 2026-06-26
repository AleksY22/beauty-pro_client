'use client';

import { deliveryService } from '../services/delivery.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { toast } from 'sonner';

import { ADMIN_URL } from '@/shared/config/url.config';

export const useDeleteDelivery = () => {
   const params = useParams<{ deliveryId: string }>();
   const router = useRouter();
   const queryClient = useQueryClient();

   const { mutate: deleteDelivery, isPending: isLoadingDelete } = useMutation({
      mutationKey: ['delete delivery'],
      mutationFn: () => deliveryService.delete(params.deliveryId),
      onSuccess() {
         queryClient.invalidateQueries({
            queryKey: ['get deliveries for store'],
         });
         toast.success('Метод доставки удален!');
         router.push(ADMIN_URL.deliveries());
      },
      onError() {
         toast.error('Ошибка при удалении метода доставки!');
      },
   });

   return useMemo(
      () => ({
         deleteDelivery,
         isLoadingDelete,
      }),
      [deleteDelivery, isLoadingDelete],
   );
};
