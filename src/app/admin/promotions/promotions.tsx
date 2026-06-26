'use client';

import { Plus } from 'lucide-react';
import Link from 'next/link';

import { DataTableLoading } from '@/shared/components/data-table';
import { DataTable } from '@/shared/components/data-table/data-table-with-page';
import { Heading } from '@/shared/components/heading';
import { Button } from '@/shared/components/ui';
import { ADMIN_URL } from '@/shared/config/url.config';
import { formatDate } from '@/shared/lib/format-date';

import { promotionColumns } from '@/features/promotion/components/promotion-columns';
import { useGetAdminPromotions } from '@/features/promotion/hooks/useGetAdminPromotions';
import { IPromotion } from '@/features/promotion/types/promotion.interface';

export function Promotions() {
   const { promotions, meta, isLoading, page, setPage, perPage, setPerPage } =
      useGetAdminPromotions();

   const formattedPromotions: IPromotion[] = promotions
      ? promotions.map((promotion) => ({
           id: promotion.id,
           createdAt: formatDate(promotion.createdAt),
           title: promotion.title,
           date: promotion.date,
           image: promotion.image,
        }))
      : [];

   return (
      <div className="p-6">
         {isLoading ? (
            <DataTableLoading />
         ) : (
            <>
               <div className="flex items-center justify-between">
                  <Heading
                     title={`Акции (${promotions?.length})`}
                     description="Все акции магазина"
                  />
                  <div className="buttons">
                     <Link href={ADMIN_URL.promotionCreate()}>
                        <Button variant="default">
                           <Plus />
                           Создать
                        </Button>
                     </Link>
                  </div>
               </div>
               <div className="mt-3">
                  <DataTable
                     columns={promotionColumns}
                     data={formattedPromotions}
                     filterKey="title"
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
