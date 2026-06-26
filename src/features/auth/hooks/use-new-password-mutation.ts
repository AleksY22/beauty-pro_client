/* eslint-disable @typescript-eslint/no-explicit-any */
import { TypeNewPasswordSchema } from '../schemes';
import { passwordRecoveryService } from '../services/password-recovery.service';
import { useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

import { PUBLIC_URL } from '@/shared/config/url.config';
import { toastMessageHandler } from '@/shared/lib/toat-message-handler';

export function useNewPasswordMutation() {
   const router = useRouter();
   const searchParams = useSearchParams();

   const token = searchParams.get('token');

   const { mutate: newPassword, isPending: isLoadingNewPassword } = useMutation(
      {
         mutationKey: ['new-password'],
         mutationFn: ({
            values,
            recaptcha,
         }: {
            values: TypeNewPasswordSchema;
            recaptcha: string;
         }) => passwordRecoveryService.newPassword(values, token, recaptcha),
         onSuccess(data: any) {
            if (data.data.message) {
               toastMessageHandler(data.data);
            } else {
               toast.success('Пароль изменен успешно!', {
                  description: 'Теперь можете войти в свой аккаунт',
               });
            }
            router.push(PUBLIC_URL.login());
         },
         onError(error) {
            toastMessageHandler(error);
         },
      },
   );

   return { newPassword, isLoadingNewPassword };
}
