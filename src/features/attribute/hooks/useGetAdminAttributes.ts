import { attributeService } from '../services/attribute.service';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

export function useGetAdminAttributes() {
   const [page, setPage] = useState(1);
   const [perPage, setPerPage] = useState(10);

   const { data, isLoading, isError } = useQuery({
      queryKey: ['admin attributes', page, perPage],
      queryFn: () => attributeService.getAll(page, perPage),
   });

   return useMemo(
      () => ({
         attributes: data?.attributes || [],
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
