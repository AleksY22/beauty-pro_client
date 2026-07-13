'use client';

import { Button } from '../../ui';
import { Grip, Loader2 } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';

import { PUBLIC_URL } from '@/shared/config/url.config';

export function CatalogButton() {
   const router = useRouter();
   const pathname = usePathname();
   const [isPending, startTransition] = useTransition();

   const handleNavigate = () => {
      if (pathname === '/category') return;

      startTransition(() => {
         router.push(PUBLIC_URL.category());
      });
   };

   return (
      <Button
         onClick={handleNavigate}
         disabled={isPending}
         className="flex gap-2 bg-red-300 hover:bg-red-300/70 text-amber-50 font-bold text-lg tracking-widest px-3 py-2 rounded-[5px] h-auto disabled:pointer-events-none disabled:opacity-70 transition-all"
      >
         {isPending ? (
            <Loader2 className="h-5 w-5 animate-spin" />
         ) : (
            <Grip className="h-5 w-5" />
         )}

         {/* Динамическая смена текста */}
         <span className="hidden sm:inline">КАТАЛОГ</span>
      </Button>
   );
}
