/* eslint-disable @typescript-eslint/no-explicit-any */
import { TypeResetPasswordSchema } from '../schemes';
import { passwordRecoveryService } from '../services/password-recovery.service';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { toastMessageHandler } from '@/shared/lib/toat-message-handler';

export function useResetPasswordMutation() {
   const { mutate: reset, isPending: isLoadingReset } = useMutation({
      mutationKey: ['reset-password'],
      mutationFn: ({
         values,
         recaptcha,
      }: {
         values: TypeResetPasswordSchema;
         recaptcha: string;
      }) => passwordRecoveryService.resetPassword(values, recaptcha),
      onSuccess(data: any) {
         if (data.data.message) {
            toastMessageHandler(data.data);
         } else {
            toast.success('Проверьте почту', {
               description: 'На вашу почту отправлена ссылка для подтверждения',
            });
         }
      },
      onError(error) {
         toastMessageHandler(error);
      },
   });

   return { reset, isLoadingReset };
}
