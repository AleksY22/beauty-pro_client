'use client';

import { Plus } from 'lucide-react';
import Link from 'next/link';

import { DataTableLoading } from '@/shared/components/data-table';
import { DataTable } from '@/shared/components/data-table/data-table-with-page';
import { Heading } from '@/shared/components/heading';
import { Button } from '@/shared/components/ui';
import { ADMIN_URL } from '@/shared/config/url.config';
import { formatDate } from '@/shared/lib/format-date';

import { paymentColumns } from '@/features/payment/components/payment-columns';
import { useGetAdminPayments } from '@/features/payment/hooks/useGetAdminPayments';
import { IPayment } from '@/features/payment/types/payment.interface';

export function Payments() {
   const { payments, meta, isLoading, page, perPage, setPage, setPerPage } =
      useGetAdminPayments();

   const formattedPayments: IPayment[] = payments
      ? payments.map((payment) => ({
           id: payment.id,
           name: payment.name,
           code: payment.code,
           description: payment.description,
           createdAt: formatDate(payment.createdAt),
           isEnabled: payment.isEnabled,
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
                     title={`Методы оплаты (${payments?.length})`}
                     description="Все методы оплаты магазина"
                  />
                  <div className="buttons">
                     <Link href={ADMIN_URL.paymentCreate()}>
                        <Button variant="default">
                           <Plus />
                           Создать
                        </Button>
                     </Link>
                  </div>
               </div>
               <div className="mt-3">
                  <DataTable
                     columns={paymentColumns}
                     data={formattedPayments}
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
