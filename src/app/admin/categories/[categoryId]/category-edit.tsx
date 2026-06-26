'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { CategoryForm } from '@/features/category/components/category-form';
import { categoryService } from '@/features/category/services/category.service';

export function CategoryEdit() {
   const params = useParams<{ categoryId: string }>();

   const { data } = useQuery({
      queryKey: ['get category', params.categoryId],
      queryFn: () => categoryService.getById(params.categoryId!),
      enabled: !!params.categoryId,
   });

   return <CategoryForm category={data} />;
}
