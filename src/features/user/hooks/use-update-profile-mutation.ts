'use client';

import { TypeSettingsSchema } from '../schemes/settings.schema';
import { userService } from '../services/user.service';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { DASHBOARD_URL } from '@/shared/config/url.config';
import { toastMessageHandler } from '@/shared/lib/toat-message-handler';

export function useUpdateProfileMutation() {
   const router = useRouter();

   const { mutate: update, isPending: isLoadingUpdate } = useMutation({
      mutationKey: ['update-profile'],
      mutationFn: (data: TypeSettingsSchema) => userService.updateProfile(data),
      onSuccess() {
         toast.success('Профиль успешно обнавлен!');
         router.push(DASHBOARD_URL.home());
      },
      onError(error) {
         toastMessageHandler(error);
      },
   });

   return { update, isLoadingUpdate };
}
