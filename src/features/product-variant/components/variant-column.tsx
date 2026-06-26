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

import { IVariantProperty } from '@/features/variant-property/types/variant-property.interface';

export interface IVariantColumn {
   id: string;
   createdAt: string;
   price: string;
   sku: string;
   stock: number;
   discount: number;
   color?: string;
   properties: IVariantProperty[];
}

export const variantColumns = (
   productId: string,
): ColumnDef<IVariantColumn>[] => [
   {
      accessorKey: 'sku',
      header: ({ column }) => {
         return (
            <Button
               variant="ghost"
               onClick={() =>
                  column.toggleSorting(column.getIsSorted() === 'asc')
               }
            >
               Код
               <ArrowUpDown className="ml-2 size-4" />
            </Button>
         );
      },
   },
   {
      accessorKey: 'stock',
      header: ({ column }) => {
         return (
            <Button
               variant="ghost"
               onClick={() =>
                  column.toggleSorting(column.getIsSorted() === 'asc')
               }
            >
               Наличие
               <ArrowUpDown className="ml-2 size-4" />
            </Button>
         );
      },
   },
   {
      accessorKey: 'price',
      header: ({ column }) => {
         return (
            <Button
               variant="ghost"
               onClick={() =>
                  column.toggleSorting(column.getIsSorted() === 'asc')
               }
            >
               Цена
               <ArrowUpDown className="ml-2 size-4" />
            </Button>
         );
      },
   },
   {
      accessorKey: 'discount',
      header: ({ column }) => {
         return (
            <Button
               variant="ghost"
               onClick={() =>
                  column.toggleSorting(column.getIsSorted() === 'asc')
               }
            >
               Скидка
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
      accessorKey: 'color',
      header: ({ column }) => {
         return (
            <Button
               variant="ghost"
               onClick={() =>
                  column.toggleSorting(column.getIsSorted() === 'asc')
               }
            >
               Цвет
               <ArrowUpDown className="ml-2 size-4" />
            </Button>
         );
      },
      cell: ({ row }) => (
         <div className="flex items-center gap-x-3">
            {row.original.color}
            <div
               className="size-5 rounded-full border"
               style={{ backgroundColor: row.original.color }}
            />
         </div>
      ),
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
               <Link href={ADMIN_URL.variantEdit(productId, row.original.id)}>
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
