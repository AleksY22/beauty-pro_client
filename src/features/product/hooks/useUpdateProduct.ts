import { productService } from '../services/product.service';
import { IProductInput } from '../types/product.interface';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { toast } from 'sonner';

import { ADMIN_URL } from '@/shared/config/url.config';

export function useUpdateProduct() {
   const params = useParams<{ productId: string }>();
   const router = useRouter();
   const queryCllient = useQueryClient();

   const { mutate: updateProduct, isPending: isLoadingUpdate } = useMutation({
      mutationKey: ['update product'],
      mutationFn: (data: IProductInput) =>
         productService.update(params.productId, data),
      onSuccess() {
         queryCllient.invalidateQueries({
            queryKey: ['get products for store dashboard'],
         });
         toast.success('Товар обновлен!');
         router.push(ADMIN_URL.products());
      },
      onError() {
         toast.error('Ошибка при обновлении товара!');
      },
   });

   return useMemo(
      () => ({ updateProduct, isLoadingUpdate }),
      [updateProduct, isLoadingUpdate],
   );
}
