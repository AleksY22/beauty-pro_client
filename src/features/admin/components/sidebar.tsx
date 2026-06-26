import { Logo } from '@/shared/components/main-layout/header/logo';

import { Navigation } from './navigation';

export function Sidebar() {
   return (
      <div className="h-full flex flex-col border-r overflow-y-auto pt-4 px-5 my-1">
         <Logo className="w-44 sm:w-44 md:w-44 lg:w-44 xl:w-44 shrink-0" />
         <Navigation />
      </div>
   );
}
