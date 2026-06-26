'use client';

import { orderService } from '../services/order.service';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

export function useGetAllOrders() {
   const [page, setPage] = useState(1);
   const [perPage, setPerPage] = useState(10);

   const { data, isLoading, isError } = useQuery({
      queryKey: ['admin orders', page, perPage],
      queryFn: () => orderService.getAll({ page, perPage }),
   });

   return useMemo(
      () => ({
         orders: data?.orders || [],
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
