import { colorService } from '../services/color.service';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

export function useGetAdminColors() {
   const [page, setPage] = useState(1);
   const [perPage, setPerPage] = useState(10);

   const { data, isLoading, isError } = useQuery({
      queryKey: ['admin colors', page, perPage],
      queryFn: () => colorService.getAll(page, perPage),
   });

   return useMemo(
      () => ({
         colors: data?.colors || [],
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
