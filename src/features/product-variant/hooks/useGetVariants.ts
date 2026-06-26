'use client';

import { productVariantService } from '../services/product-variant.service';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useMemo, useState } from 'react';

export function useGetVariants() {
   const params = useParams<{ productId: string }>();

   const [page, setPage] = useState(1);
   const [perPage, setPerPage] = useState(10);

   const { data, isLoading, isError } = useQuery({
      queryKey: ['admin variants', page, perPage],
      queryFn: () =>
         productVariantService.getByProductId(params.productId, page, perPage),
   });

   return useMemo(
      () => ({
         variants: data?.variants || [],
         meta: data?.meta || {
            totalCount: 0,
            currentPage: 1,
            totalPages: 1,
            hasMore: false,
         },
         isLoading,
         isError,
         page,
         setPage,
         perPage,
         setPerPage,
      }),
      [data, isLoading, isError, page, perPage],
   );
}
