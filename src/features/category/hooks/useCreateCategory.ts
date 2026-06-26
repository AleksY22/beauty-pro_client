'use client';

import { categoryService } from '../services/category.service';
import { ICategoryInput } from '../types/category.interface';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { toast } from 'sonner';

import { ADMIN_URL } from '@/shared/config/url.config';

export const useCreateCategory = () => {
   const router = useRouter();
   const queryClient = useQueryClient();

   const { mutate: createCategory, isPending: isLoadingCreate } = useMutation({
      mutationKey: ['create category'],
      mutationFn: (data: ICategoryInput) => categoryService.create(data),
      onSuccess() {
         queryClient.invalidateQueries({
            queryKey: ['admin categories'],
         });
         toast.success('Категория создана успешно!');
         router.push(ADMIN_URL.categories());
      },
      onError() {
         toast.error('Ошибка при создании категории!');
      },
   });

   return useMemo(
      () => ({
         createCategory,
         isLoadingCreate,
      }),
      [createCategory, isLoadingCreate],
   );
};
