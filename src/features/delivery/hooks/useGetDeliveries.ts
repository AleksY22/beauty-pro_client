'use client';

import { deliveryService } from '../services/delivery.service';
import { useQuery } from '@tanstack/react-query';

export const useGetDeliveries = () => {
   const { data: deliveries, isLoading } = useQuery({
      queryKey: ['get deliveries for store'],
      queryFn: () => deliveryService.getAvailable(),
      select: (data) => data || [],
   });

   return {
      deliveries,
      isLoading,
   };
};
