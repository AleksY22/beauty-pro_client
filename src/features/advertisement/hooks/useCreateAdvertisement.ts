'use client';

import { advertisementService } from '../services/advertisement.service';
import { IAdvertisementInput } from '../types/advertisement.interface';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { toast } from 'sonner';

import { ADMIN_URL } from '@/shared/config/url.config';

export const useCreateAdvertisement = () => {
   const router = useRouter();
   const queryClient = useQueryClient();

   const { mutate: createAdvertisement, isPending: isLoadingCreate } =
      useMutation({
         mutationKey: ['create advertisement'],
         mutationFn: (data: IAdvertisementInput) =>
            advertisementService.create(data),
         onSuccess() {
            queryClient.invalidateQueries({
               queryKey: ['admin advertisements'],
            });
            toast.success('Реклама создана успешно!');
            router.push(ADMIN_URL.advertisements());
         },
         onError() {
            toast.error('Ошибка при создании рекламы!');
         },
      });

   return useMemo(
      () => ({
         createAdvertisement,
         isLoadingCreate,
      }),
      [createAdvertisement, isLoadingCreate],
   );
};
