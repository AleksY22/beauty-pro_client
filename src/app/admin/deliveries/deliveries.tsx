'use client';

import { Plus } from 'lucide-react';
import Link from 'next/link';

import { DataTableLoading } from '@/shared/components/data-table';
import { DataTable } from '@/shared/components/data-table/data-table-with-page';
import { Heading } from '@/shared/components/heading';
import { Button } from '@/shared/components/ui';
import { ADMIN_URL } from '@/shared/config/url.config';
import { formatDate } from '@/shared/lib/format-date';

import { deliveryColumns } from '@/features/delivery/components/delivery-columns';
import { useGetAdminDeliveries } from '@/features/delivery/hooks/useGetAdminDeliveries';
import { IDelivery } from '@/features/delivery/types/delivery.interface';

export function Deliveries() {
   const { deliveries, meta, isLoading, page, perPage, setPage, setPerPage } =
      useGetAdminDeliveries();

   const formattedDeliveries: IDelivery[] = deliveries
      ? deliveries.map((delivery) => ({
           id: delivery.id,
           name: delivery.name,
           code: delivery.code,
           description: delivery.description,
           createdAt: formatDate(delivery.createdAt),
           isEnabled: delivery.isEnabled,
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
                     title={`Методы доставки (${deliveries?.length})`}
                     description="Все методы доставки магазина"
                  />
                  <div className="buttons">
                     <Link href={ADMIN_URL.deliveryCreate()}>
                        <Button variant="default">
                           <Plus />
                           Создать
                        </Button>
                     </Link>
                  </div>
               </div>
               <div className="mt-3">
                  <DataTable
                     columns={deliveryColumns}
                     data={formattedDeliveries}
                     filterKey="name"
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
