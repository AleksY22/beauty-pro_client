'use client';

import { productService } from '../services/product.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { toast } from 'sonner';

import { ADMIN_URL } from '@/shared/config/url.config';

export function useDeleteProduct() {
   const params = useParams<{ productId: string }>();

   const router = useRouter();

   const queryCllient = useQueryClient();

   const { mutate: deleteProduct, isPending: isLoadingDelete } = useMutation({
      mutationKey: ['delete product'],
      mutationFn: () => productService.delete(params.productId),
      onSuccess() {
         queryCllient.invalidateQueries({
            queryKey: ['get products for store dashboard'],
         });
         toast.success('Товар удален!');
         router.push(ADMIN_URL.products());
      },
      onError() {
         toast.error('Ошибка при удалении товара!');
      },
   });

   return useMemo(
      () => ({ deleteProduct, isLoadingDelete }),
      [deleteProduct, isLoadingDelete],
   );
}
