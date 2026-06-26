import { PropsWithChildren } from 'react';

import { AdminLayout } from '@/features/admin/components/admin-layout';

export default function Layout({ children }: PropsWithChildren) {
   return <AdminLayout>{children}</AdminLayout>;
}
