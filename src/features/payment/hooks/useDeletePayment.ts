'use client';

import { paymentService } from '../services/payment.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { toast } from 'sonner';

import { ADMIN_URL } from '@/shared/config/url.config';

export const useDeletePayment = () => {
   const params = useParams<{ paymentId: string }>();
   const router = useRouter();
   const queryClient = useQueryClient();

   const { mutate: deletePayment, isPending: isLoadingDelete } = useMutation({
      mutationKey: ['delete payment'],
      mutationFn: () => paymentService.delete(params.paymentId),
      onSuccess() {
         queryClient.invalidateQueries({
            queryKey: ['get payments for store'],
         });
         toast.success('Метод оплаты удален!');
         router.push(ADMIN_URL.payments());
      },
      onError() {
         toast.error('Ошибка при удалении метода оплаты!');
      },
   });

   return useMemo(
      () => ({
         deletePayment,
         isLoadingDelete,
      }),
      [deletePayment, isLoadingDelete],
   );
};
