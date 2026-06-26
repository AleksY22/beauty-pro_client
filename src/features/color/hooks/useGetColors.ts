'use client';

import { colorService } from '../services/color.service';
import { useQuery } from '@tanstack/react-query';

export const useGetColors = () => {
   const { data: colors, isLoading } = useQuery({
      queryKey: ['get colors for store'],
      queryFn: () => colorService.getAll(),
      select: (data) => data?.colors || [],
   });

   return {
      colors,
      isLoading,
   };
};
