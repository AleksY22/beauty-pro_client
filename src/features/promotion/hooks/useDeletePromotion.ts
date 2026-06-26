'use client';

import { promotionService } from '../services/promotion.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { toast } from 'sonner';

import { ADMIN_URL } from '@/shared/config/url.config';

export const useDeletePromotion = () => {
   const params = useParams<{ promotionId: string }>();
   const router = useRouter();

   const queryClient = useQueryClient();

   const { mutate: deletePromotion, isPending: isLoadingDelete } = useMutation({
      mutationKey: ['delete promotion'],
      mutationFn: () => promotionService.delete(params.promotionId),
      onSuccess() {
         queryClient.invalidateQueries({
            queryKey: ['admin promotions'],
         });
         toast.success('Акция удалена успешно!');
         router.push(ADMIN_URL.promotions());
      },
      onError() {
         toast.error('Ошибка при удалении акции!');
      },
   });

   return useMemo(
      () => ({
         deletePromotion,
         isLoadingDelete,
      }),
      [deletePromotion, isLoadingDelete],
   );
};
