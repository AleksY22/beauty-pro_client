'use client';

import { Button } from '../../ui';
import { Grip, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { PUBLIC_URL } from '@/shared/config/url.config';

export function CatalogButton() {
   const [isLoading, setIsLoading] = useState(false);

   return (
      <Button
         asChild
         className={`flex gap-2 bg-red-300 hover:bg-red-300/90 text-amber-50 font-bold text-lg tracking-widest px-6 py-5 rounded-[5px] h-auto transition-all
        ${isLoading ? 'pointer-events-none opacity-70' : ''}
      `}
      >
         <Link
            href={PUBLIC_URL.category()}
            onClick={() => setIsLoading(true)} // Включаем режим загрузки при клике
         >
            {isLoading ? (
               <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
               <Grip className="h-5 w-5" />
            )}
            <span className="hidden sm:inline">КАТАЛОГ</span>
         </Link>
      </Button>
   );
}
