import { Grip, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/shared/components/ui';
import { PUBLIC_URL } from '@/shared/config/url.config';

import { Logo } from './logo';
import { ProfileButton } from './profile-button';
import { SearchInput } from './search-input';
import { CartNum } from '@/features/cart/components/cart-num';

export function Header() {
   return (
      <div className="h-full border-b mb-5 p-4 md:p-5 mx-5 lg:mx-14">
         <div className="flex justify-between items-center gap-x-3 h-full mb-3">
            <Logo />
            <Button
               asChild
               className="flex bg-red-300 hover:bg-red-300/90 text-amber-50 font-bold text-lg tracking-widest px-6 py-5 rounded-[5px]"
               variant="ghost"
            >
               <Link href={PUBLIC_URL.category()}>
                  <Grip />
                  <span className="hidden sm:inline">КАТАЛОГ</span>
               </Link>
            </Button>
            <div className="hidden md:block flex-1 max-w-md mx-4">
               <SearchInput />
            </div>
            <div className="flex gap-x-3 md:gap-x-5 items-center justify-end">
               <Link href={PUBLIC_URL.cart()} className="relative">
                  <ShoppingCart className="w-8 h-8 text-red-300 hover:text-red-300/80" />
                  <CartNum />
               </Link>
               <ProfileButton />
            </div>
         </div>
         <div className="mt-4 flex items-center justify-center md:hidden w-full">
            <SearchInput />
         </div>
      </div>
   );
}
