'use client';

import { colorService } from '../services/color.service';
import { IColorInput } from '../types/color.interface';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { toast } from 'sonner';

import { ADMIN_URL } from '@/shared/config/url.config';

export const useCreateColor = () => {
   const router = useRouter();

   const queryClient = useQueryClient();

   const { mutate: createColor, isPending: isLoadingCreate } = useMutation({
      mutationKey: ['create color'],
      mutationFn: (data: IColorInput) => colorService.create(data),
      onSuccess() {
         queryClient.invalidateQueries({
            queryKey: ['get colors for store'],
         });
         toast.success('Цвет создан!');
         router.push(ADMIN_URL.colors());
      },
      onError() {
         toast.error('Ошибка при создании цвета!');
      },
   });

   return useMemo(
      () => ({
         createColor,
         isLoadingCreate,
      }),
      [createColor, isLoadingCreate],
   );
};
