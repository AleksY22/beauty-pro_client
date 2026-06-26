'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal, Pencil } from 'lucide-react';
import Link from 'next/link';

import {
   Button,
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuTrigger,
} from '@/shared/components/ui';
import { ADMIN_URL } from '@/shared/config/url.config';

export interface IOrderColumn {
   id: string;
   createdAt: string;
   username: string | null;
   status: string;
   total: string;
}

export const orderColumns: ColumnDef<IOrderColumn>[] = [
   {
      accessorKey: 'createdAt',
      header: ({ column }) => {
         return (
            <Button
               variant="ghost"
               onClick={() =>
                  column.toggleSorting(column.getIsSorted() === 'asc')
               }
            >
               Дата создания
               <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
         );
      },
   },
   {
      accessorKey: 'username',
      header: ({ column }) => {
         return (
            <Button
               variant="ghost"
               onClick={() =>
                  column.toggleSorting(column.getIsSorted() === 'asc')
               }
            >
               Имя покупателя
               <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
         );
      },
   },
   {
      accessorKey: 'status',
      header: ({ column }) => {
         return (
            <Button
               variant="ghost"
               onClick={() =>
                  column.toggleSorting(column.getIsSorted() === 'asc')
               }
            >
               Статус
               <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
         );
      },
   },
   {
      accessorKey: 'total',
      header: ({ column }) => {
         return (
            <Button
               variant="ghost"
               onClick={() =>
                  column.toggleSorting(column.getIsSorted() === 'asc')
               }
            >
               Сумма
               <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
         );
      },
   },
   {
      accessorKey: 'actions',
      header: 'Действия',
      cell: ({ row }) => (
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <Button variant="ghost" className="size-8 p-0">
                  <MoreHorizontal className="size-4" />
               </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
               <DropdownMenuLabel>Действия</DropdownMenuLabel>
               <Link href={ADMIN_URL.orderInfo(row.original.id)}>
                  <DropdownMenuItem>
                     <Pencil className="size-4 mr-2" />
                     Подробнее
                  </DropdownMenuItem>
               </Link>
            </DropdownMenuContent>
         </DropdownMenu>
      ),
   },
];
