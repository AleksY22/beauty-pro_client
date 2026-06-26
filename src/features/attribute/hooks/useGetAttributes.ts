'use client';

import { attributeService } from '../services/attribute.service';
import { useQuery } from '@tanstack/react-query';

export const useGetAttributes = () => {
   const { data: attributes, isLoading } = useQuery({
      queryKey: ['get attributes for store'],
      queryFn: () => attributeService.getAll(),
      select: (data) => data?.attributes || [],
   });

   return {
      attributes,
      isLoading,
   };
};
