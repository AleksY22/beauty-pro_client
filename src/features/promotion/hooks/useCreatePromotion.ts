'use client';

import { promotionService } from '../services/promotion.service';
import { IPromotionInput } from '../types/promotion.interface';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { toast } from 'sonner';

import { ADMIN_URL } from '@/shared/config/url.config';

export const useCreatePromotion = () => {
   const router = useRouter();
   const queryClient = useQueryClient();

   const { mutate: createPromotion, isPending: isLoadingCreate } = useMutation({
      mutationKey: ['create promotion'],
      mutationFn: (data: IPromotionInput) => promotionService.create(data),
      onSuccess() {
         queryClient.invalidateQueries({
            queryKey: ['admin promotions'],
         });
         toast.success('Акция создана успешно!');
         router.push(ADMIN_URL.promotions());
      },
      onError() {
         toast.error('Ошибка при создании акции!');
      },
   });

   return useMemo(
      () => ({
         createPromotion,
         isLoadingCreate,
      }),
      [createPromotion, isLoadingCreate],
   );
};
