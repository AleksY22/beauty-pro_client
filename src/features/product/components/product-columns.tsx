import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Layers, MoreHorizontal, Pencil } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/shared/components/ui';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { ADMIN_URL } from '@/shared/config/url.config';

export interface IProductColumn {
   id: string;
   title: string;
   category: string;
   createdAt: string;
}

export const productsColumns: ColumnDef<IProductColumn>[] = [
   {
      accessorKey: 'title',
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
      accessorKey: 'category',
      header: ({ column }) => {
         return (
            <Button
               variant="ghost"
               onClick={() =>
                  column.toggleSorting(column.getIsSorted() === 'asc')
               }
            >
               Категория
               <ArrowUpDown className="ml-2 size-4" />
            </Button>
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
               <Link href={ADMIN_URL.variants(row.original.id)}>
                  <DropdownMenuItem>
                     <Layers className="mr-2 h-4 w-4" /> Варианты
                  </DropdownMenuItem>
               </Link>
               <Link href={ADMIN_URL.productEdit(row.original.id)}>
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
