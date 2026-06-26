import { IDelivery } from '../types/delivery.interface';
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

export const deliveryColumns: ColumnDef<IDelivery>[] = [
   {
      accessorKey: 'name',
      header: ({ column }) => {
         return (
            <Button
               variant="ghost"
               onClick={() =>
                  column.toggleSorting(column.getIsSorted() === 'asc')
               }
            >
               Название
               <ArrowUpDown className="ml-2 size-4" />
            </Button>
         );
      },
   },
   {
      accessorKey: 'code',
      header: ({ column }) => {
         return (
            <Button
               variant="ghost"
               onClick={() =>
                  column.toggleSorting(column.getIsSorted() === 'asc')
               }
            >
               Уникальный код
               <ArrowUpDown className="ml-2 size-4" />
            </Button>
         );
      },
   },
   {
      accessorKey: 'isEnabled',
      header: ({ column }) => {
         return (
            <Button
               variant="ghost"
               onClick={() =>
                  column.toggleSorting(column.getIsSorted() === 'asc')
               }
            >
               Статус
               <ArrowUpDown className="ml-2 size-4" />
            </Button>
         );
      },
      cell: ({ row }) => {
         const isEnabled = row.original.isEnabled;
         return (
            <div className="flex items-center">
               {isEnabled ? (
                  <span className="inline-flex items-center">Активен</span>
               ) : (
                  <span className="inline-flex items-center">Отключен</span>
               )}
            </div>
         );
      },
   },
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
               <ArrowUpDown className="ml-2 size-4" />
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
               <Link href={ADMIN_URL.deliveryEdit(row.original.id)}>
                  <DropdownMenuItem>
                     <Pencil className="size-4 mr-2" />
                     Изменить
                  </DropdownMenuItem>
               </Link>
            </DropdownMenuContent>
         </DropdownMenu>
      ),
   },
];
