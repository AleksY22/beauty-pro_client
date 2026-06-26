'use client';

import { categoryService } from '../services/category.service';
import { ICategoryInput } from '../types/category.interface';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { toast } from 'sonner';

import { ADMIN_URL } from '@/shared/config/url.config';

export const useUpdateCategory = () => {
   const params = useParams<{ categoryId: string }>();
   const router = useRouter();
   const queryClient = useQueryClient();

   const { mutate: updateCategory, isPending: isLoadingUpdate } = useMutation({
      mutationKey: ['update category'],
      mutationFn: (data: ICategoryInput) =>
         categoryService.update(params.categoryId, data),
      onSuccess() {
         queryClient.invalidateQueries({
            queryKey: ['admin categories'],
         });
         toast.success('Категория обновлена успешно!');
         router.push(ADMIN_URL.categories());
      },
      onError() {
         toast.error('Ошибка при обновлении категории!');
      },
   });

   return useMemo(
      () => ({
         updateCategory,
         isLoadingUpdate,
      }),
      [updateCategory, isLoadingUpdate],
   );
};
