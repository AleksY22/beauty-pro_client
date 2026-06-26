import { Metadata } from 'next';

import { NewVerificationForm } from '@/features/auth/components/new-verification-form';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
   title: 'Подтверждение почты',
};

export default function NewVerificationPage() {
   return <NewVerificationForm />;
}
