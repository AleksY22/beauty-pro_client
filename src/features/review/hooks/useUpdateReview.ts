'use client';

import { reviewService } from '../services/review.service';
import { IReviewInput } from '../types/review.interface';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import { toast } from 'sonner';

export function useUpdateReview() {
   const params = useParams<{ reviewId: string }>();

   const queryClient = useQueryClient();

   const { mutate: updateReview, isPending: isLoadingUpdate } = useMutation({
      mutationKey: ['update review'],
      mutationFn: (data: IReviewInput) =>
         reviewService.update(params.reviewId, data),
      onSuccess() {
         queryClient.invalidateQueries({
            queryKey: ['variant'],
         });
         toast.success('Отзыв создан!');
      },
      onError() {
         toast.error('Ошибка при создании отзыва!');
      },
   });

   return useMemo(
      () => ({
         updateReview,
         isLoadingUpdate,
      }),
      [updateReview, isLoadingUpdate],
   );
}
