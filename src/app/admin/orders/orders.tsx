'use client';

import { useMemo } from 'react';

import { DataTableLoading } from '@/shared/components/data-table';
import { DataTable } from '@/shared/components/data-table/data-table-with-page';
import { Heading } from '@/shared/components/heading';
import { formatDate } from '@/shared/lib/format-date';
import { formatPrice } from '@/shared/lib/format-price';

import {
   IOrderColumn,
   orderColumns,
} from '@/features/order/components/order-admin-columns';
import { useGetAllOrders } from '@/features/order/hooks/useGetAllOrders';

export function Orders() {
   const { orders, meta, isLoading, page, setPage, perPage, setPerPage } =
      useGetAllOrders();

   const formattedOrders: IOrderColumn[] = useMemo(() => {
      return orders.map((order) => ({
         id: order.id,
         createdAt: formatDate(order.createdAt),
         username: order.user?.displayName || order.firstName || null,
         status: order.status,
         total: formatPrice(Number(order.total)),
      }));
   }, [orders]);

   return (
      <div className="p-6">
         {isLoading ? (
            <DataTableLoading />
         ) : (
            <>
               <div className="flex items-center justify-between">
                  <Heading
                     title={`Заказы (${meta.totalCount})`}
                     description="Все заказы магазина"
                  />
               </div>
               <div className="mt-3">
                  <DataTable
                     columns={orderColumns}
                     data={formattedOrders}
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
