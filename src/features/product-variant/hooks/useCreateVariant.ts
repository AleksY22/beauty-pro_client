'use client';

import { productVariantService } from '../services/product-variant.service';
import { IProductVariantInput } from '../types/product-variant.interface';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { toast } from 'sonner';

import { ADMIN_URL } from '@/shared/config/url.config';

export function useCreateVariant() {
   const router = useRouter();
   const params = useParams<{ productId: string }>();

   const queryCllient = useQueryClient();

   const { mutate: createVariant, isPending: isLoadingCreate } = useMutation({
      mutationKey: ['create variant'],
      mutationFn: (data: IProductVariantInput) =>
         productVariantService.create(params.productId, data),
      onSuccess() {
         queryCllient.invalidateQueries({
            queryKey: ['admin variants'],
         });
         toast.success('Вариант товара создан!');
         router.push(ADMIN_URL.variants(params.productId));
      },
      onError() {
         toast.error('Ошибка при создании варианта товара!');
      },
   });

   return useMemo(
      () => ({
         createVariant,
         isLoadingCreate,
      }),
      [createVariant, isLoadingCreate],
   );
}
