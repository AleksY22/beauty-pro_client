'use client';

import { categoryService } from '../services/category.service';
import { useQuery } from '@tanstack/react-query';

export const useGetCategories = () => {
   const { data: categories, isLoading } = useQuery({
      queryKey: ['get categories for store'],
      queryFn: () => categoryService.getAll(),
      select: (data) => data?.categories || [],
   });

   return {
      categories,
      isLoading,
   };
};
