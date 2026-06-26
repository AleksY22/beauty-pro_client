'use client';

import { productVariantService } from '../services/product-variant.service';
import { IFilterParams } from '../types/product-variant.interface';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useMemo, useState } from 'react';

export function useGetVariantsByCategory() {
   const params = useParams<{ categoryId: string }>();

   const [page, setPage] = useState(1);
   const [perPage, setPerPage] = useState(10);

   const [filters, setFilters] = useState<IFilterParams>({});

   const { data, isLoading, isError } = useQuery({
      queryKey: [
         'get variants by category',
         params.categoryId,
         page,
         perPage,
         filters,
      ],
      queryFn: () =>
         productVariantService.getByCategory(
            params.categoryId,
            page,
            perPage,
            filters,
         ),
      enabled: !!params.categoryId,
   });

   const updateFilters = (newFilters: IFilterParams) => {
      setFilters(newFilters);
      setPage(1);
   };

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
         filters,
         updateFilters,
      }),
      [data, isLoading, isError, page, perPage, filters],
   );
}
