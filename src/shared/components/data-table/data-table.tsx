'use client';

import {
   ColumnDef,
   ColumnFiltersState,
   SortingState,
   flexRender,
   getCoreRowModel,
   getFilteredRowModel,
   getSortedRowModel,
   useReactTable,
} from '@tanstack/react-table';
import React from 'react';

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
   filterKey?: string;
}

export function DataTable<TData, TValue>({
   columns,
   data,
   filterKey,
}: DataTableProps<TData, TValue>) {
   const [sorting, setSorting] = React.useState<SortingState>([]);
   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
      [],
   );

   // eslint-disable-next-line react-hooks/incompatible-library
   const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      onSortingChange: setSorting,
      getSortedRowModel: getSortedRowModel(),
      onColumnFiltersChange: setColumnFilters,
      getFilteredRowModel: getFilteredRowModel(),
      state: {
         sorting,
         columnFilters,
      },
   });

   return (
      <div>
         {filterKey && (
            <div className="flex items-center py-4">
               <Input
                  placeholder="Поиск"
                  value={
                     (table.getColumn(filterKey)?.getFilterValue() as string) ??
                     ''
                  }
                  onChange={(event) =>
                     table
                        .getColumn(`${filterKey}`)
                        ?.setFilterValue(event.target.value)
                  }
                  className="max-w-sm"
               />
            </div>
         )}

         <div className="overflow-hidden rounded-md border">
            <Table>
               <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                     <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                           return (
                              <TableHead key={header.id}>
                                 {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                         header.column.columnDef.header,
                                         header.getContext(),
                                      )}
                              </TableHead>
                           );
                        })}
                     </TableRow>
                  ))}
               </TableHeader>
               <TableBody>
                  {table.getRowModel().rows?.length ? (
                     table.getRowModel().rows.map((row) => (
                        <TableRow
                           key={row.id}
                           data-state={row.getIsSelected() && 'selected'}
                        >
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
                           Данные не найдены!
                        </TableCell>
                     </TableRow>
                  )}
               </TableBody>
            </Table>
         </div>
      </div>
   );
}
