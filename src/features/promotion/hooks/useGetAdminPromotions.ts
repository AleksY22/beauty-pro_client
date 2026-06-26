'use client';

import { promotionService } from '../services/promotion.service';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

export function useGetAdminPromotions() {
   const [page, setPage] = useState(1);
   const [perPage, setPerPage] = useState(10);

   const { data, isLoading, isError } = useQuery({
      queryKey: ['admin promotions', page, perPage],
      queryFn: () => promotionService.getAll(page, perPage),
   });

   return useMemo(
      () => ({
         promotions: data?.promotions || [],
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
