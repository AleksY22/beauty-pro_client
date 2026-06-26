import { verificationService } from '../services/verification.service';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { DASHBOARD_URL, PUBLIC_URL } from '@/shared/config/url.config';

import { useAuthActions } from '@/features/cart/hooks/useAuthActions';

export function useVerificationMutation() {
   const router = useRouter();

   const { handleAuthSuccess } = useAuthActions();

   const { mutate: verification } = useMutation({
      mutationKey: ['new verification'],
      mutationFn: (token: string | null) =>
         verificationService.newVerification(token),
      onSuccess() {
         toast.success('Подтверждение почты прошло успешно!');

         handleAuthSuccess();

         router.push(DASHBOARD_URL.settings());
      },
      onError() {
         toast.error('Ошибка при подтверждении почты!');
         router.push(PUBLIC_URL.login());
      },
   });

   return { verification };
}
