import { PropsWithChildren } from 'react';

import { Footer } from './footer/footer';
import { Header } from './header/header';

export function MainLayout({ children }: PropsWithChildren<unknown>) {
   return (
      <div className="flex flex-col min-h-screen w-full">
         <Header />
         <main className="flex-[1_1_auto] mx-5 lg:mx-14">{children}</main>
         <Footer />
      </div>
   );
}
