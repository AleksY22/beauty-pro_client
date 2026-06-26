'use client';

import { productService } from '../services/product.service';
import { IProductInput } from '../types/product.interface';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { toast } from 'sonner';

import { ADMIN_URL } from '@/shared/config/url.config';

export function useCreateProduct() {
   const router = useRouter();

   const queryCllient = useQueryClient();

   const { mutate: createProduct, isPending: isLoadingCreate } = useMutation({
      mutationKey: ['create product'],
      mutationFn: (data: IProductInput) => productService.create(data),
      onSuccess() {
         queryCllient.invalidateQueries({
            queryKey: ['get products for store dashboard'],
         });
         toast.success('Товар создан!');
         router.push(ADMIN_URL.products());
      },
      onError() {
         toast.error('Ошибка при создании товара!');
      },
   });

   return useMemo(
      () => ({
         createProduct,
         isLoadingCreate,
      }),
      [createProduct, isLoadingCreate],
   );
}
