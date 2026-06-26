'use client';

import { useVerificationMutation } from '../hooks';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { Loading } from '@/shared/components/ui';

import { AuthWrapper } from './auth-wrapper';

export function NewVerificationForm() {
   const searchParams = useSearchParams();
   const token = searchParams.get('token');

   const { verification } = useVerificationMutation();

   useEffect(() => {
      verification(token);
   }, [token, verification]);

   return (
      <AuthWrapper heading="Подтверждение почты">
         <div>
            <Loading />
         </div>
      </AuthWrapper>
   );
}
