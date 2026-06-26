'use client';

import { attributeService } from '../services/attribute.service';
import { IAttributeInput } from '../types/attribute.interface';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { toast } from 'sonner';

import { ADMIN_URL } from '@/shared/config/url.config';

export const useUpdateAttribute = () => {
   const params = useParams<{ attributeId: string }>();
   const router = useRouter();
   const queryClient = useQueryClient();

   const { mutate: updateAttribute, isPending: isLoadingUpdate } = useMutation({
      mutationKey: ['update attribute'],
      mutationFn: (data: IAttributeInput) =>
         attributeService.update(params.attributeId, data),
      onSuccess() {
         queryClient.invalidateQueries({
            queryKey: ['admin attributes'],
         });
         toast.success('Характеристика обновлена успешно!');
         router.push(ADMIN_URL.attributes());
      },
      onError() {
         toast.error('Ошибка при обновлении характеристики!');
      },
   });

   return useMemo(
      () => ({
         updateAttribute,
         isLoadingUpdate,
      }),
      [updateAttribute, isLoadingUpdate],
   );
};
