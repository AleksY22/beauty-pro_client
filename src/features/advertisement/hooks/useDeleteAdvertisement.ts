'use client';

import { advertisementService } from '../services/advertisement.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { toast } from 'sonner';

import { ADMIN_URL } from '@/shared/config/url.config';

export const useDeleteAdvertisement = () => {
   const params = useParams<{ advertisementId: string }>();
   const router = useRouter();

   const queryClient = useQueryClient();

   const { mutate: deleteAdvertisement, isPending: isLoadingDelete } =
      useMutation({
         mutationKey: ['delete advertisement'],
         mutationFn: () => advertisementService.delete(params.advertisementId),
         onSuccess() {
            queryClient.invalidateQueries({
               queryKey: ['admin advertisements'],
            });
            toast.success('Реклама удалена успешно!');
            router.push(ADMIN_URL.advertisements());
         },
         onError() {
            toast.error('Ошибка при удалении рекламы!');
         },
      });

   return useMemo(
      () => ({
         deleteAdvertisement,
         isLoadingDelete,
      }),
      [deleteAdvertisement, isLoadingDelete],
   );
};
