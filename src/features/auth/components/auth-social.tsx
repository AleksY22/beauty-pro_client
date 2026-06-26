'use client';

import { authService } from '../services/auth.service';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { FaGoogle, FaYandex } from 'react-icons/fa';

import { Button } from '@/shared/components/ui';

export function AuthSocial() {
   const router = useRouter();

   const { mutateAsync } = useMutation({
      mutationKey: ['oauth by provider'],
      mutationFn: async (provider: 'google' | 'yandex') =>
         await authService.oauthByProvider(provider),
   });

   const onClick = async (provider: 'google' | 'yandex') => {
      const response = await mutateAsync(provider);

      if (response) {
         router.push(response.data.url);
      }
   };

   return (
      <>
         <div className="relative mb-6 space-y-4">
            <div className="absolute inset-3 flex items-center">
               <span className="w-full border-t" />
            </div>
         </div>
         <div className="grid grid-cols-2 gap-6">
            <Button onClick={() => onClick('google')} variant="outline">
               <FaGoogle className="mr-2 size-4" />
               Google
            </Button>
            <Button onClick={() => onClick('yandex')} variant="outline">
               <FaYandex className="mr-2 size-4" />
               Yandex
            </Button>
         </div>
      </>
   );
}
