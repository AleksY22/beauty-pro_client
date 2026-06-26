'use client';

import { categoryService } from '../services/category.service';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

export function useGetAdminCategories() {
   const [page, setPage] = useState(1);
   const [perPage, setPerPage] = useState(10);

   const { data, isLoading, isError } = useQuery({
      queryKey: ['admin categories', page, perPage],
      queryFn: () => categoryService.getAll(page, perPage),
   });

   return useMemo(
      () => ({
         categories: data?.categories || [],
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
