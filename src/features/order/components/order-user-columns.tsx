'use client';

import { OrderStatus, STATUS_TRANSLATIONS } from '../types/order.interface';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { Button } from '@/shared/components/ui';

export interface IOrderColumn {
   id: string;
   createdAt: string;
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
      accessorKey: 'status',
      header: ({ column }) => (
         <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
         >
            Статус
            <ArrowUpDown className="ml-2 h-4 w-4" />
         </Button>
      ),
      cell: ({ row }) => {
         const status = row.getValue('status') as OrderStatus;
         const statusConfig = STATUS_TRANSLATIONS[status];

         if (!statusConfig) {
            return <span>{status}</span>; // Запасной вариант
         }

         return (
            <span
               className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusConfig.color}`}
            >
               {statusConfig.text}
            </span>
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
];
