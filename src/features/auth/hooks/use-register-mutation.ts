import { TypeRegisterSchema } from '../schemes';
import { authService } from '../services/auth.service';
import { useMutation } from '@tanstack/react-query';

import { toastMessageHandler } from '@/shared/lib/toat-message-handler';

export function useRegisterMutation() {
   const { mutate: register, isPending: isLoadingRegister } = useMutation({
      mutationKey: ['register user'],
      mutationFn: ({
         values,
         recaptcha,
      }: {
         values: TypeRegisterSchema;
         recaptcha: string;
      }) => authService.register(values, recaptcha),
      onSuccess(data) {
         toastMessageHandler(data.data);
      },
      onError(error) {
         toastMessageHandler(error);
      },
   });

   return { register, isLoadingRegister };
}
