'use client';

import { productVariantService } from '../services/product-variant.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { toast } from 'sonner';

import { ADMIN_URL } from '@/shared/config/url.config';

export function useDeleteVariant() {
   const params = useParams<{ variantId: string }>();
   const router = useRouter();

   const queryCllient = useQueryClient();

   const { mutate: deleteVariant, isPending: isLoadingDelete } = useMutation({
      mutationKey: ['delete variant'],
      mutationFn: () => productVariantService.delete(params.variantId),
      onSuccess() {
         queryCllient.invalidateQueries({
            queryKey: ['admin variants'],
         });
         toast.success('Вариант товара удален!');
         router.push(ADMIN_URL.variants(params.variantId));
      },
      onError() {
         toast.error('Ошибка при удалении варианта товара!');
      },
   });

   return useMemo(
      () => ({
         deleteVariant,
         isLoadingDelete,
      }),
      [deleteVariant, isLoadingDelete],
   );
}
