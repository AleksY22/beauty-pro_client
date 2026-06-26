'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { Button } from '@/shared/components/ui';

import { ReviewRowActions } from './review-actions';

export interface IReviewColumn {
   id: string;
   createdAt: string;
   rating: string;
   username: string;
   text: string;
   productName: string;
}

export const reviewColumns: ColumnDef<IReviewColumn>[] = [
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
      accessorKey: 'productName',
      header: ({ column }) => {
         return (
            <Button
               variant="ghost"
               onClick={() =>
                  column.toggleSorting(column.getIsSorted() === 'asc')
               }
            >
               Товар
               <ArrowUpDown className="ml-2 size-4" />
            </Button>
         );
      },
   },
   {
      accessorKey: 'rating',
      header: ({ column }) => {
         return (
            <Button
               variant="ghost"
               onClick={() =>
                  column.toggleSorting(column.getIsSorted() === 'asc')
               }
            >
               Рейтинг
               <ArrowUpDown className="ml-2 size-4" />
            </Button>
         );
      },
   },
   {
      accessorKey: 'text',
      header: 'Текст отзыва',
      cell: ({ row }) => (
         <div
            className="max-w-75 truncate text-muted-foreground"
            title={row.original.text}
         >
            {row.original.text}
         </div>
      ),
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
               Пользователь
               <ArrowUpDown className="ml-2 size-4" />
            </Button>
         );
      },
   },
   {
      id: 'actions',
      header: 'Действия',
      cell: ({ row }) => <ReviewRowActions reviewId={row.original.id} />,
   },
];
