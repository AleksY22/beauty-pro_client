import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

import { PUBLIC_URL } from '@/shared/config/url.config';

import { CatalogButton } from './catalog-button';
import { Logo } from './logo';
import { ProfileButton } from './profile-button';
import { SearchInput } from './search-input';
import { CartNum } from '@/features/cart/components/cart-num';

export function Header() {
   return (
      <div className="h-full border-b mb-5 p-4 md:p-5 mx-5 lg:mx-14">
         <div className="flex justify-between items-center gap-x-3 h-full mb-3">
            <Logo />
            <CatalogButton />
            <div className="hidden md:block flex-1 max-w-md mx-4">
               <Suspense
                  fallback={
                     <div className="h-10 bg-gray-100 animate-pulse rounded-lg w-full" />
                  }
               >
                  <SearchInput />
               </Suspense>
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
            <Suspense
               fallback={
                  <div className="h-10 bg-gray-100 animate-pulse rounded-lg w-full" />
               }
            >
               <SearchInput />
            </Suspense>
         </div>
      </div>
   );
}
