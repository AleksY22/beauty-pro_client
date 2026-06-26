'use client';

import { promotionService } from '../services/promotion.service';
import { IPromotionInput } from '../types/promotion.interface';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { toast } from 'sonner';

import { ADMIN_URL } from '@/shared/config/url.config';

export const useUpdatePromotion = () => {
   const params = useParams<{ promotionId: string }>();
   const router = useRouter();
   const queryClient = useQueryClient();

   const { mutate: updatePromotion, isPending: isLoadingUpdate } = useMutation({
      mutationKey: ['update promotion'],
      mutationFn: (data: IPromotionInput) =>
         promotionService.update(params.promotionId, data),
      onSuccess() {
         queryClient.invalidateQueries({
            queryKey: ['admin promotions'],
         });
         toast.success('Акция обновлена успешно!');
         router.push(ADMIN_URL.promotions());
      },
      onError() {
         toast.error('Ошибка при обновлении акции!');
      },
   });

   return useMemo(
      () => ({
         updatePromotion,
         isLoadingUpdate,
      }),
      [updatePromotion, isLoadingUpdate],
   );
};
