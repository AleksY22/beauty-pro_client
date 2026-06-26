'use client';

import { Plus } from 'lucide-react';
import Link from 'next/link';

import { DataTableLoading } from '@/shared/components/data-table';
import { DataTable } from '@/shared/components/data-table/data-table-with-page';
import { Heading } from '@/shared/components/heading';
import { Button } from '@/shared/components/ui';
import { ADMIN_URL } from '@/shared/config/url.config';
import { formatDate } from '@/shared/lib/format-date';

import { colorColumns } from '@/features/color/components/color-columns';
import { useGetAdminColors } from '@/features/color/hooks/useGetAdminColors';
import { IColor } from '@/features/color/types/color.interface';

export function Colors() {
   const { colors, isLoading, meta, page, setPage, perPage, setPerPage } =
      useGetAdminColors();

   const formattedColors: IColor[] = colors
      ? colors.map((color) => ({
           id: color.id,
           createdAt: formatDate(color.createdAt),
           name: color.name,
           value: color.value,
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
                     title={`Цвета (${colors?.length})`}
                     description="Все цвета магазина"
                  />
                  <div className="buttons">
                     <Link href={ADMIN_URL.colorCreate()}>
                        <Button variant="default">
                           <Plus />
                           Создать
                        </Button>
                     </Link>
                  </div>
               </div>
               <div className="mt-3">
                  <DataTable
                     columns={colorColumns}
                     data={formattedColors}
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
