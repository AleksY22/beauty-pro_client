/* eslint-disable react-hooks/incompatible-library */
'use no memo';

'use client';

import {
   ColumnDef,
   ColumnFiltersState,
   PaginationState,
   flexRender,
   getCoreRowModel,
   getFilteredRowModel,
   useReactTable,
} from '@tanstack/react-table';
import * as React from 'react';

import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@/shared/components/ui/table';

interface DataTableProps<TData, TValue> {
   columns: ColumnDef<TData, TValue>[];
   data: TData[];
   filterKey: string;

   // Пропсы для управления серверной пагинацией
   rowCount: number; // Общее количество записей в БД
   pageCount: number; // Общее количество страниц
   paginationState: PaginationState; // { pageIndex, pageSize }
   onPageChange: (pageIndex: number) => void;
   onPageSizeChange: (pageSize: number) => void;
}

export function DataTable<TData, TValue>({
   columns,
   data,
   filterKey,
   rowCount,
   pageCount,
   paginationState,
   onPageChange,
   onPageSizeChange,
}: DataTableProps<TData, TValue>) {
   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
      [],
   );

   const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      onColumnFiltersChange: setColumnFilters,

      // Включаем серверную пагинацию
      manualPagination: true,
      rowCount,
      pageCount,

      state: {
         columnFilters,
         pagination: paginationState, // Передаем состояние снаружи
      },

      // Перехватываем изменения страниц внутри таблицы и отдаем родителю
      onPaginationChange: (updater) => {
         if (typeof updater === 'function') {
            const nextState = updater(paginationState);
            if (nextState.pageIndex !== paginationState.pageIndex) {
               onPageChange(nextState.pageIndex);
            }
            if (nextState.pageSize !== paginationState.pageSize) {
               onPageSizeChange(nextState.pageSize);
            }
         }
      },
   });

   return (
      <div>
         {/* Фильтрация */}
         <div className="flex items-center py-4">
            <Input
               placeholder="Поиск..."
               value={
                  (table.getColumn(filterKey)?.getFilterValue() as string) ?? ''
               }
               onChange={(event) =>
                  table.getColumn(filterKey)?.setFilterValue(event.target.value)
               }
               className="max-w-sm"
            />
         </div>

         {/* Таблица */}
         <div className="rounded-md border">
            <Table>
               <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                     <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                           <TableHead key={header.id}>
                              {header.isPlaceholder
                                 ? null
                                 : flexRender(
                                      header.column.columnDef.header,
                                      header.getContext(),
                                   )}
                           </TableHead>
                        ))}
                     </TableRow>
                  ))}
               </TableHeader>
               <TableBody>
                  {table.getRowModel().rows?.length ? (
                     table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id}>
                           {row.getVisibleCells().map((cell) => (
                              <TableCell key={cell.id}>
                                 {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext(),
                                 )}
                              </TableCell>
                           ))}
                        </TableRow>
                     ))
                  ) : (
                     <TableRow>
                        <TableCell
                           colSpan={columns.length}
                           className="h-24 text-center"
                        >
                           Нет результатов.
                        </TableCell>
                     </TableRow>
                  )}
               </TableBody>
            </Table>
         </div>

         {/* Панель пагинации (Кнопки Назад / Вперед) */}
         <div className="flex items-center justify-end space-x-2 py-4">
            <div className="text-sm text-muted-foreground mr-4">
               Страница {paginationState.pageIndex + 1} из {pageCount || 1}
            </div>
            <Button
               variant="outline"
               size="sm"
               onClick={() => table.previousPage()}
               disabled={!table.getCanPreviousPage()}
            >
               Назад
            </Button>
            <Button
               variant="outline"
               size="sm"
               onClick={() => table.nextPage()}
               disabled={!table.getCanNextPage()}
            >
               Вперед
            </Button>
         </div>
      </div>
   );
}
