'use client';

import { colorService } from '../services/color.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { toast } from 'sonner';

import { ADMIN_URL } from '@/shared/config/url.config';

export const useDeleteColor = () => {
   const params = useParams<{ colorId: string }>();
   const router = useRouter();
   const queryClient = useQueryClient();

   const { mutate: deleteColor, isPending: isLoadingDelete } = useMutation({
      mutationKey: ['delete color'],
      mutationFn: () => colorService.delete(params.colorId),
      onSuccess() {
         queryClient.invalidateQueries({
            queryKey: ['get colors for store'],
         });
         toast.success('Цвет успешно удален!');
         router.push(ADMIN_URL.colors());
      },
      onError() {
         toast.error('Ошибка при удалении цвета!');
      },
   });

   return useMemo(
      () => ({
         deleteColor,
         isLoadingDelete,
      }),
      [deleteColor, isLoadingDelete],
   );
};
