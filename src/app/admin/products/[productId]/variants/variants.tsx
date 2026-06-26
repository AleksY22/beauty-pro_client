'use client';

import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';

import { DataTableLoading } from '@/shared/components/data-table';
import { DataTable } from '@/shared/components/data-table/data-table-with-page';
import { Heading } from '@/shared/components/heading';
import { Button } from '@/shared/components/ui';
import { ADMIN_URL } from '@/shared/config/url.config';
import { formatDate } from '@/shared/lib/format-date';

import {
   IVariantColumn,
   variantColumns,
} from '@/features/product-variant/components/variant-column';
import { useGetVariants } from '@/features/product-variant/hooks/useGetVariants';

export function Variants() {
   const params = useParams<{ productId: string }>();
   const { variants, isLoading, meta, page, setPage, perPage, setPerPage } =
      useGetVariants();

   const productTitle = useMemo(() => {
      return variants?.[0]?.product?.title ?? '';
   }, [variants]);

   const formattedVariants: IVariantColumn[] = variants
      ? variants.map((variant) => ({
           id: variant.id,
           createdAt: formatDate(variant.createdAt),
           price: variant.price,
           sku: variant.sku,
           stock: variant.stock,
           discount: variant.discount,
           color: variant.color?.value,
           properties: variant.properties,
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
                     title={`Вариации товара ${productTitle} (${variants?.length})`}
                     description={`Все вариации товара #${params.productId}`}
                  />
                  <div className="buttons">
                     <Link href={ADMIN_URL.variantCreate(params.productId)}>
                        <Button variant="default">
                           <Plus />
                           Создать
                        </Button>
                     </Link>
                  </div>
               </div>
               <div className="mt-3">
                  <DataTable
                     columns={variantColumns(params.productId)}
                     data={formattedVariants}
                     filterKey="sku"
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
