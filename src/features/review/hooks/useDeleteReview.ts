'use client';

import { reviewService } from '../services/review.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import { toast } from 'sonner';

export function useDeleteReviews() {
   const queryClient = useQueryClient();
   const params = useParams();

   const variantId = params?.variantId as string;

   const { mutate: deleteReview, isPending: isLoadingDelete } = useMutation({
      mutationKey: ['delete review'],
      mutationFn: (reviewId: string) => reviewService.delete(reviewId),
      onSuccess() {
         // 1. Сбрасываем кэш конкретного товара
         if (variantId) {
            queryClient.invalidateQueries({
               queryKey: ['variant', variantId],
            });
         }
         // 2. Сбрасываем общие ключи
         queryClient.invalidateQueries({ queryKey: ['admin reviews'] });

         toast.success('Отзыв удален!');
      },
      // onError() {
      //    toast.error('Ошибка при удалении отзыва!');
      // },
      onError(error: unknown) {
         const nestError = error as {
            response?: { data?: { message?: string } };
         };
         const errorMessage =
            nestError?.response?.data?.message || 'Ошибка при удалении отзыва!';
         toast.error(errorMessage);
      },
   });

   return useMemo(
      () => ({ deleteReview, isLoadingDelete }),
      [deleteReview, isLoadingDelete],
   );
}
