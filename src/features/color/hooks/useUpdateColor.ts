'use client';

import { colorService } from '../services/color.service';
import { IColorInput } from '../types/color.interface';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { toast } from 'sonner';

import { ADMIN_URL } from '@/shared/config/url.config';

export const useUpdateColor = () => {
   const params = useParams<{ colorId: string }>();
   const router = useRouter();
   const queryClient = useQueryClient();

   const { mutate: updateColor, isPending: isLoadingUpdate } = useMutation({
      mutationKey: ['update color'],
      mutationFn: (data: IColorInput) =>
         colorService.update(params.colorId, data),
      onSuccess() {
         queryClient.invalidateQueries({
            queryKey: ['get colors for store'],
         });
         toast.success('Цвет обновлен успешно!');
         router.push(ADMIN_URL.colors());
      },
      onError() {
         toast.error('Ошибка при обновлении цвета!');
      },
   });

   return useMemo(
      () => ({
         updateColor,
         isLoadingUpdate,
      }),
      [updateColor, isLoadingUpdate],
   );
};
