'use client';

import { advertisementService } from '../services/advertisement.service';
import { IAdvertisementInput } from '../types/advertisement.interface';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { toast } from 'sonner';

import { ADMIN_URL } from '@/shared/config/url.config';

export const useUpdateAdvertisement = () => {
   const params = useParams<{ advertisementId: string }>();
   const router = useRouter();
   const queryClient = useQueryClient();

   const { mutate: updateAdvertisement, isPending: isLoadingUpdate } =
      useMutation({
         mutationKey: ['update advertisement'],
         mutationFn: (data: IAdvertisementInput) =>
            advertisementService.update(params.advertisementId, data),
         onSuccess() {
            queryClient.invalidateQueries({
               queryKey: ['admin advertisements'],
            });
            toast.success('Реклама обновлена успешно!');
            router.push(ADMIN_URL.advertisements());
         },
         onError() {
            toast.error('Ошибка при обновлении рекламы!');
         },
      });

   return useMemo(
      () => ({
         updateAdvertisement,
         isLoadingUpdate,
      }),
      [updateAdvertisement, isLoadingUpdate],
   );
};
