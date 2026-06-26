'use client';

import { attributeService } from '../services/attribute.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { toast } from 'sonner';

import { ADMIN_URL } from '@/shared/config/url.config';

export const useDeleteAttribute = () => {
   const params = useParams<{ attributeId: string }>();
   const router = useRouter();
   const queryClient = useQueryClient();

   const { mutate: deleteAttribute, isPending: isLoadingDelete } = useMutation({
      mutationKey: ['delete attribute'],
      mutationFn: () => attributeService.delete(params.attributeId),
      onSuccess() {
         queryClient.invalidateQueries({
            queryKey: ['admin attributes'],
         });
         toast.success('Характеристика успешно удалена!');
         router.push(ADMIN_URL.attributes());
      },
      onError() {
         toast.error('Ошибка при удалении характеристики!');
      },
   });

   return useMemo(
      () => ({
         deleteAttribute,
         isLoadingDelete,
      }),
      [deleteAttribute, isLoadingDelete],
   );
};
