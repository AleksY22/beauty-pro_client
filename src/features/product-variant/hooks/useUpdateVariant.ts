'use client';

import { productVariantService } from '../services/product-variant.service';
import { IProductVariantInput } from '../types/product-variant.interface';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { toast } from 'sonner';

import { ADMIN_URL } from '@/shared/config/url.config';

export function useUpdateVariant() {
   const router = useRouter();
   const params = useParams<{ variantId: string; productId: string }>();

   const queryClient = useQueryClient();

   const { mutate: updateVariant, isPending: isLoadingUpdate } = useMutation({
      mutationKey: ['update variant', params.variantId],
      mutationFn: (data: IProductVariantInput) =>
         productVariantService.update(params.variantId, data),
      onSuccess() {
         queryClient.invalidateQueries({
            queryKey: ['admin variants'],
         });
         toast.success('Вариант товара обновлен!');
         router.push(ADMIN_URL.variants(params.productId));
      },
      onError() {
         toast.error('Ошибка при обновлении варианта товара!');
      },
   });

   return useMemo(
      () => ({
         updateVariant,
         isLoadingUpdate,
      }),
      [updateVariant, isLoadingUpdate],
   );
}
