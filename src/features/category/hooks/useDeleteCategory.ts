'use client';

import { categoryService } from '../services/category.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { toast } from 'sonner';

import { ADMIN_URL } from '@/shared/config/url.config';

export const useDeleteCategory = () => {
   const params = useParams<{ categoryId: string }>();
   const router = useRouter();

   const queryClient = useQueryClient();

   const { mutate: deleteCategory, isPending: isLoadingDelete } = useMutation({
      mutationKey: ['delete category'],
      mutationFn: () => categoryService.delete(params.categoryId),
      onSuccess() {
         queryClient.invalidateQueries({
            queryKey: ['admin categories'],
         });
         toast.success('Категория удалена успешно!');
         router.push(ADMIN_URL.categories());
      },
      onError() {
         toast.error('Ошибка при удалении категории!');
      },
   });

   return useMemo(
      () => ({
         deleteCategory,
         isLoadingDelete,
      }),
      [deleteCategory, isLoadingDelete],
   );
};
