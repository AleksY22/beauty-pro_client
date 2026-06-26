import { ProfileButton } from '@/shared/components/main-layout/header/profile-button';

import { MobileSidebar } from './mobile-sidebar';

export function Header() {
   return (
      <div className="p-6 gap-x-4 h-full flex items-center border-b">
         <MobileSidebar />
         <div className="flex items-center ml-auto gap-x-4">
            <ProfileButton />
         </div>
      </div>
   );
}
