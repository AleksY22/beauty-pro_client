'use client';

import { promotionService } from '../services/promotion.service';
import { useQuery } from '@tanstack/react-query';

export const useGetPromotions = () => {
   const { data: promotions, isLoading } = useQuery({
      queryKey: ['get promotions for store'],
      queryFn: () => promotionService.getAll(),
      select: (data) => data?.promotions || [],
   });

   return {
      promotions,
      isLoading,
   };
};
