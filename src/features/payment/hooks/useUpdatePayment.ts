'use client';

import { paymentService } from '../services/payment.service';
import { IPaymentInput } from '../types/payment.interface';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { toast } from 'sonner';

import { ADMIN_URL } from '@/shared/config/url.config';

export const useUpdatePayment = () => {
   const params = useParams<{ paymentId: string }>();
   const router = useRouter();
   const queryClient = useQueryClient();

   const { mutate: updatePayment, isPending: isLoadingUpdate } = useMutation({
      mutationKey: ['update payment'],
      mutationFn: (data: IPaymentInput) =>
         paymentService.update(params.paymentId, data),
      onSuccess() {
         queryClient.invalidateQueries({
            queryKey: ['get payments for store'],
         });
         toast.success('Метод доставки обновлен!');
         router.push(ADMIN_URL.payments());
      },
      onError() {
         toast.error('Ошибка при обновлении метода доставки!');
      },
   });

   return useMemo(
      () => ({
         updatePayment,
         isLoadingUpdate,
      }),
      [updatePayment, isLoadingUpdate],
   );
};
