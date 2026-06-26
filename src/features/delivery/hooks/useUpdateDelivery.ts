'use client';

import { deliveryService } from '../services/delivery.service';
import { IDeliveryInput } from '../types/delivery.interface';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { toast } from 'sonner';

import { ADMIN_URL } from '@/shared/config/url.config';

export const useUpdateDelivery = () => {
   const params = useParams<{ deliveryId: string }>();
   const router = useRouter();
   const queryClient = useQueryClient();

   const { mutate: updateDelivery, isPending: isLoadingUpdate } = useMutation({
      mutationKey: ['update delivery'],
      mutationFn: (data: IDeliveryInput) =>
         deliveryService.update(params.deliveryId, data),
      onSuccess() {
         queryClient.invalidateQueries({
            queryKey: ['get deliveries for store'],
         });
         toast.success('Метод доставки обновлен!');
         router.push(ADMIN_URL.deliveries());
      },
      onError() {
         toast.error('Ошибка при обновлении метода доставки!');
      },
   });

   return useMemo(
      () => ({
         updateDelivery,
         isLoadingUpdate,
      }),
      [updateDelivery, isLoadingUpdate],
   );
};
