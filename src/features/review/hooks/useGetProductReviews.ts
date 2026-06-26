'use client';

import { reviewService } from '../services/review.service';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';

export const useGetReviews = () => {
   const params = useParams<{ variantId: string }>();

   const { data: reviews, isLoading } = useQuery({
      queryKey: ['get reviews for product'],
      queryFn: () => reviewService.getByProduct(params.variantId),
   });

   return useMemo(
      () => ({
         reviews,
         isLoading,
      }),
      [reviews, isLoading],
   );
};
