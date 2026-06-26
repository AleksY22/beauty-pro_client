'use client';

import {
   Avatar,
   AvatarFallback,
   AvatarImage,
   Button,
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '../../ui';
import { LogIn, Settings } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LuLogOut } from 'react-icons/lu';

import { DASHBOARD_URL, PUBLIC_URL } from '@/shared/config/url.config';
import { useProfile } from '@/shared/hooks/useProfile';

import { UserButtonLoading } from '@/features/user/components/user-button';
import { useLogoutMutation } from '@/features/user/hooks';

export function ProfileButton() {
   const { user, isLoading } = useProfile();
   const { logout, isLoadingLogout } = useLogoutMutation();
   const router = useRouter();

   const onSettings = () => {
      router.push(DASHBOARD_URL.home());
   };

   return (
      <>
         {isLoading ? (
            <UserButtonLoading />
         ) : user ? (
            <DropdownMenu>
               <DropdownMenuTrigger>
                  <Avatar>
                     <AvatarImage src={user.picture} />
                     <AvatarFallback>
                        {user.displayName.slice(0, 1)}
                     </AvatarFallback>
                  </Avatar>
               </DropdownMenuTrigger>
               <DropdownMenuContent className="w-40" align="end">
                  <DropdownMenuItem onClick={onSettings}>
                     <Settings className="mr-2 size-4" />
                     Профиль
                  </DropdownMenuItem>
                  <DropdownMenuItem
                     disabled={isLoadingLogout}
                     onClick={() => logout()}
                  >
                     <LuLogOut className="mr-2 size-4" />
                     Выйти
                  </DropdownMenuItem>
               </DropdownMenuContent>
            </DropdownMenu>
         ) : (
            <Link href={PUBLIC_URL.login()}>
               <Button className="rounded-full h-8 w-8">
                  <LogIn className="size-4" />
               </Button>
            </Link>
         )}
      </>
   );
}
