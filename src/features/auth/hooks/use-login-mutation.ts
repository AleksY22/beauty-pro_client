/* eslint-disable @typescript-eslint/no-explicit-any */
import { TypeLoginSchema } from '../schemes';
import { authService } from '../services/auth.service';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
import { toast } from 'sonner';

import { PUBLIC_URL } from '@/shared/config/url.config';
import { toastMessageHandler } from '@/shared/lib/toat-message-handler';

import { useAuthActions } from '@/features/cart/hooks/useAuthActions';

export function useLoginMutation(
   setIsShowTwoFactor: Dispatch<SetStateAction<boolean>>,
) {
   const router = useRouter();
   const { handleAuthSuccess } = useAuthActions();

   const { mutate: login, isPending: isLoadingLogin } = useMutation({
      mutationKey: ['login user'],
      mutationFn: ({
         values,
         recaptcha,
      }: {
         values: TypeLoginSchema;
         recaptcha: string;
      }) => authService.login(values, recaptcha),
      onSuccess(data: any) {
         if (data.data.message) {
            if (
               data.data.message ===
               'Проверьте вашу почту. Требуется код двухфакторной аутентификации.'
            ) {
               setIsShowTwoFactor(true);
            }
            toastMessageHandler(data.data);
         } else {
            toast.success('Авторизация прошла успешно!');

            //Запускаем хук слияние гостевой корзины с бэкендом NestJS.
            handleAuthSuccess();

            router.push(PUBLIC_URL.home());
         }
      },
      onError(error) {
         toastMessageHandler(error);
      },
   });

   return { login, isLoadingLogin };
}
