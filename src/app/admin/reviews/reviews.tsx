'use client';

import { useMemo } from 'react';

import { DataTableLoading } from '@/shared/components/data-table';
import { DataTable } from '@/shared/components/data-table/data-table-with-page';
import { Heading } from '@/shared/components/heading';
import { formatDate } from '@/shared/lib/format-date';

import {
   IReviewColumn,
   reviewColumns,
} from '@/features/review/components/review-columns';
import { useGetAllReviews } from '@/features/review/hooks/useGetAllReviews';

export function Reviews() {
   const { reviews, meta, isLoading, page, setPage, perPage, setPerPage } =
      useGetAllReviews();

   const formattedReviews: IReviewColumn[] = useMemo(() => {
      return reviews.map((review) => ({
         id: review.id,
         createdAt: formatDate(review.createdAt),
         rating: Array.from({ length: review.rating })
            .map(() => '⭐')
            .join(' '),
         username: review.user.displayName,
         text: review.text,
         productName: review.product?.title || 'Товар удален',
      }));
   }, [reviews]);

   return (
      <div className="p-6">
         {isLoading ? (
            <DataTableLoading />
         ) : (
            <>
               <div className="flex items-center justify-between">
                  <Heading
                     title={`Отзывы (${meta.totalCount})`}
                     description="Все отзывы магазина"
                  />
               </div>
               <div className="mt-3">
                  <DataTable
                     columns={reviewColumns}
                     data={formattedReviews}
                     filterKey="createdAt"
                     rowCount={meta.totalCount}
                     pageCount={meta.totalPages}
                     paginationState={{
                        pageIndex: page - 1,
                        pageSize: perPage,
                     }}
                     onPageChange={(newPage) => setPage(newPage + 1)}
                     onPageSizeChange={(newSize) => setPerPage(newSize)}
                  />
               </div>
            </>
         )}
      </div>
   );
}
