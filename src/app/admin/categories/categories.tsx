'use client';

import { Plus } from 'lucide-react';
import Link from 'next/link';

import { DataTableLoading } from '@/shared/components/data-table';
import { DataTable } from '@/shared/components/data-table/data-table-with-page';
import { Heading } from '@/shared/components/heading';
import { Button } from '@/shared/components/ui';
import { ADMIN_URL } from '@/shared/config/url.config';
import { formatDate } from '@/shared/lib/format-date';

import { categoryColumns } from '@/features/category/components/category-columns';
import { useGetAdminCategories } from '@/features/category/hooks/useGetAdminCategories';
import { ICategory } from '@/features/category/types/category.interface';

export function Categories() {
   const { categories, meta, isLoading, page, setPage, perPage, setPerPage } =
      useGetAdminCategories();

   const formattedCategories: ICategory[] = categories
      ? categories.map((category) => ({
           id: category.id,
           createdAt: formatDate(category.createdAt),
           title: category.title,
           description: category.description,
           image: category.image,
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
                     title={`Категории (${categories?.length})`}
                     description="Все категории магазина"
                  />
                  <div className="buttons">
                     <Link href={ADMIN_URL.categoryCreate()}>
                        <Button variant="default">
                           <Plus />
                           Создать
                        </Button>
                     </Link>
                  </div>
               </div>
               <div className="mt-3">
                  <DataTable
                     columns={categoryColumns}
                     data={formattedCategories}
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
