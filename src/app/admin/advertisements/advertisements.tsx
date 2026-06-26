'use client';

import { Plus } from 'lucide-react';
import Link from 'next/link';

import { DataTableLoading } from '@/shared/components/data-table';
import { DataTable } from '@/shared/components/data-table/data-table-with-page';
import { Heading } from '@/shared/components/heading';
import { Button } from '@/shared/components/ui';
import { ADMIN_URL } from '@/shared/config/url.config';
import { formatDate } from '@/shared/lib/format-date';

import { advertisementColumns } from '@/features/advertisement/components/advertisement-columns';
import { useGetAdminAdvertisements } from '@/features/advertisement/hooks/useGetAdminAdvertisements';
import { IAdvertisement } from '@/features/advertisement/types/advertisement.interface';

export function Advertisements() {
   const {
      advertisements,
      meta,
      isLoading,
      page,
      setPage,
      perPage,
      setPerPage,
   } = useGetAdminAdvertisements();

   const formattedAdvertisements: IAdvertisement[] = advertisements
      ? advertisements.map((advertisement) => ({
           id: advertisement.id,
           createdAt: formatDate(advertisement.createdAt),
           title: advertisement.title,
           image: advertisement.image,
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
                     title={`Реклама (${advertisements?.length})`}
                     description="Вся реклама магазина"
                  />
                  <div className="buttons">
                     <Link href={ADMIN_URL.advertisementCreate()}>
                        <Button variant="default">
                           <Plus />
                           Создать
                        </Button>
                     </Link>
                  </div>
               </div>
               <div className="mt-3">
                  <DataTable
                     columns={advertisementColumns}
                     data={formattedAdvertisements}
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
