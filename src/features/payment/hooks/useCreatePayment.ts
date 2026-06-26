'use client';

import { paymentService } from '../services/payment.service';
import { IPaymentInput } from '../types/payment.interface';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { toast } from 'sonner';

import { ADMIN_URL } from '@/shared/config/url.config';

export const useCreatePayment = () => {
   const router = useRouter();

   const queryClient = useQueryClient();

   const { mutate: createPayment, isPending: isLoadingCreate } = useMutation({
      mutationKey: ['create payment'],
      mutationFn: (data: IPaymentInput) => paymentService.create(data),
      onSuccess() {
         queryClient.invalidateQueries({
            queryKey: ['get payments for store'],
         });
         toast.success('Метод оплаты создан!');
         router.push(ADMIN_URL.payments());
      },
      onError() {
         toast.error('Ошибка при создании метода оплаты!');
      },
   });

   return useMemo(
      () => ({
         createPayment,
         isLoadingCreate,
      }),
      [createPayment, isLoadingCreate],
   );
};
