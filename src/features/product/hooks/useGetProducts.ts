import { productService } from '../services/product.service';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export function useGetProducts() {
   const { data: products, isLoading } = useQuery({
      queryKey: ['get products for store'],
      queryFn: () => productService.getAll(),
   });

   return useMemo(
      () => ({
         products,
         isLoading,
      }),
      [products, isLoading],
   );
}
