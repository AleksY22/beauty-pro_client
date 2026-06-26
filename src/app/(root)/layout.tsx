import { PropsWithChildren } from 'react';

import { MainLayout } from '@/shared/components/main-layout/main-layout';

export default function Layout({ children }: PropsWithChildren<unknown>) {
   return <MainLayout>{children}</MainLayout>;
}
