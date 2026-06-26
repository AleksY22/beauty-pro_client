'use client';

import { attributeService } from '../services/attribute.service';
import { IAttributeInput } from '../types/attribute.interface';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { toast } from 'sonner';

import { ADMIN_URL } from '@/shared/config/url.config';

export const useCreateAttribute = () => {
   const router = useRouter();

   const queryClient = useQueryClient();

   const { mutate: createAttribute, isPending: isLoadingCreate } = useMutation({
      mutationKey: ['create attribute'],
      mutationFn: (data: IAttributeInput) => attributeService.create(data),
      onSuccess() {
         queryClient.invalidateQueries({
            queryKey: ['admin attributes'],
         });
         toast.success('Характеристика создана!');
         router.push(ADMIN_URL.attributes());
      },
      onError() {
         toast.error('Ошибка при создании характеристики!');
      },
   });

   return useMemo(
      () => ({
         createAttribute,
         isLoadingCreate,
      }),
      [createAttribute, isLoadingCreate],
   );
};
