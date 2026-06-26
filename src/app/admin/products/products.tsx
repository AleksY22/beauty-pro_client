'use client';

import { Plus } from 'lucide-react';
import Link from 'next/link';

import { DataTableLoading } from '@/shared/components/data-table';
import { DataTable } from '@/shared/components/data-table/data-table-with-page';
import { Heading } from '@/shared/components/heading';
import { Button } from '@/shared/components/ui';
import { ADMIN_URL } from '@/shared/config/url.config';
import { formatDate } from '@/shared/lib/format-date';

import {
   IProductColumn,
   productsColumns,
} from '@/features/product/components/product-columns';
import { useGetAdminProducts } from '@/features/product/hooks/useGetAdminProducts';

export function Products() {
   const { products, isLoading, meta, page, setPage, perPage, setPerPage } =
      useGetAdminProducts();

   const formattedProducts: IProductColumn[] = products
      ? products.map((product) => ({
           id: product.id,
           title: product.title,
           category: product.category.title,
           createdAt: formatDate(product.createdAt),
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
                     title={`Товары (${products?.length})`}
                     description="Все товары магазина"
                  />
                  <div className="buttons">
                     <Link href={ADMIN_URL.productCreate()}>
                        <Button variant="default">
                           <Plus />
                           Создать
                        </Button>
                     </Link>
                  </div>
               </div>
               <div className="mt-3">
                  <DataTable
                     columns={productsColumns}
                     data={formattedProducts}
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
