'use client';

import { deliveryService } from '../services/delivery.service';
import { IDeliveryInput } from '../types/delivery.interface';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { toast } from 'sonner';

import { ADMIN_URL } from '@/shared/config/url.config';

export const useCreateDelivery = () => {
   const router = useRouter();

   const queryClient = useQueryClient();

   const { mutate: createDelivery, isPending: isLoadingCreate } = useMutation({
      mutationKey: ['create delivery'],
      mutationFn: (data: IDeliveryInput) => deliveryService.create(data),
      onSuccess() {
         queryClient.invalidateQueries({
            queryKey: ['get deliveries for store'],
         });
         toast.success('Метод доставки создан!');
         router.push(ADMIN_URL.deliveries());
      },
      onError() {
         toast.error('Ошибка при создании метода доставки!');
      },
   });

   return useMemo(
      () => ({
         createDelivery,
         isLoadingCreate,
      }),
      [createDelivery, isLoadingCreate],
   );
};
