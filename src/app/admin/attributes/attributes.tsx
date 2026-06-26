'use client';

import { Plus } from 'lucide-react';
import Link from 'next/link';

import { DataTableLoading } from '@/shared/components/data-table';
import { DataTable } from '@/shared/components/data-table/data-table-with-page';
import { Heading } from '@/shared/components/heading';
import { Button } from '@/shared/components/ui';
import { ADMIN_URL } from '@/shared/config/url.config';
import { formatDate } from '@/shared/lib/format-date';

import { attributeColumns } from '@/features/attribute/components/attribute-columns';
import { useGetAdminAttributes } from '@/features/attribute/hooks/useGetAdminAttributes';
import { IAttribute } from '@/features/attribute/types/attribute.interface';

export function Attributes() {
   const { attributes, isLoading, meta, page, setPage, perPage, setPerPage } =
      useGetAdminAttributes();

   const formattedAttributes: IAttribute[] = attributes
      ? attributes.map((attribute) => ({
           id: attribute.id,
           createdAt: formatDate(attribute.createdAt),
           name: attribute.name,
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
                     title={`Характеристики (${attributes?.length})`}
                     description="Все характеристики товара"
                  />
                  <div className="buttons">
                     <Link href={ADMIN_URL.attributeCreate()}>
                        <Button variant="default">
                           <Plus />
                           Создать
                        </Button>
                     </Link>
                  </div>
               </div>
               <div className="mt-3">
                  <DataTable
                     columns={attributeColumns}
                     data={formattedAttributes}
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
