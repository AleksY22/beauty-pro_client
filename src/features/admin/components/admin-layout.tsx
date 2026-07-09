import { PropsWithChildren } from 'react';

import { AdminBoundary } from './admin-boundary';
import { Header } from './header';
import { Sidebar } from './sidebar';

export function AdminLayout({ children }: PropsWithChildren<unknown>) {
   return (
      <AdminBoundary>
         <div className="flex flex-col w-full">
            <div className="hidden lg:flex h-full w-64 flex-col fixed inset-y-0 z-50">
               <Sidebar />
            </div>
            <div className="h-20 lg:pl-64 fixed inset-y-0 w-full z-49 bg-background">
               <Header />
            </div>
            <main className="mt-20 lg:pl-64">{children}</main>
         </div>
      </AdminBoundary>
   );
}
