'use client';

import { MoreHorizontal, Trash } from 'lucide-react';
import { useState } from 'react';

import { ConfirmModal } from '@/shared/components/confirm-modal';
import { Button } from '@/shared/components/ui/button';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';

import { useDeleteReviews } from '@/features/review/hooks/useDeleteReview';

interface ReviewRowActionsProps {
   reviewId: string;
}

export function ReviewRowActions({ reviewId }: ReviewRowActionsProps) {
   const { deleteReview, isLoadingDelete } = useDeleteReviews();
   const [isConfirmOpen, setIsConfirmOpen] = useState(false);

   const handleDelete = () => {
      deleteReview(reviewId);
      setIsConfirmOpen(false);
   };

   return (
      <>
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Открыть меню</span>
                  <MoreHorizontal className="h-4 w-4" />
               </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
               <DropdownMenuLabel>Действия</DropdownMenuLabel>

               <DropdownMenuItem
                  onClick={() => setIsConfirmOpen(true)}
                  disabled={isLoadingDelete}
                  className="focus:text-red-600 cursor-pointer w-full"
               >
                  <Trash className="mr-2 h-4 w-4" />
                  Удалить
               </DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenu>

         <ConfirmModal
            open={isConfirmOpen}
            onOpenChange={setIsConfirmOpen}
            handleClick={handleDelete}
         />
      </>
   );
}
