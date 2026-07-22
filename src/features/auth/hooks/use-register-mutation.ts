'use client';

import { TypeRegisterSchema } from '../schemes';
import { authService } from '../services/auth.service';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { PUBLIC_URL } from '@/shared/config/url.config';
import { toastMessageHandler } from '@/shared/lib/toat-message-handler';

export function useRegisterMutation() {
   const router = useRouter();

   const { mutate: register, isPending: isLoadingRegister } = useMutation({
      mutationKey: ['register user'],
      mutationFn: ({
         values,
         recaptcha,
      }: {
         values: TypeRegisterSchema;
         recaptcha: string;
      }) => authService.register(values, recaptcha),
      onSuccess() {
         // toastMessageHandler(data.data);
         router.push(PUBLIC_URL.success());
      },
      onError(error) {
         toastMessageHandler(error);
      },
   });

   return { register, isLoadingRegister };
}
