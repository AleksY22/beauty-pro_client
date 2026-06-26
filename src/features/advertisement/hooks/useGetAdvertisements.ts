'use client';

import { advertisementService } from '../services/advertisement.service';
import { useQuery } from '@tanstack/react-query';

export const useGetAdvertisements = () => {
   const { data: advertisements, isLoading } = useQuery({
      queryKey: ['get advertisements for store'],
      queryFn: () => advertisementService.getAll(),
      select: (data) => data?.advertisements || [],
   });

   return {
      advertisements,
      isLoading,
   };
};
