'use client';

import { IMenuItem } from '../types/menu.interface';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/shared/lib/utils';

interface MenuItemProps {
   route: IMenuItem;
}

export function MenuItem({ route }: MenuItemProps) {
   const pathname = usePathname();

   return (
      <Link
         href={route.link}
         className={cn(
            'flex items-center gap-x-3 text-slate-500 text-sm font-medium py-2.5 px-3 rounded-lg hover:bg-gray-300/20 hover:text-black-500 hover:drop-shadow-sm bg-transparent transition-all duration-200',
            {
               ['text-sm text-gray bg-gray-500/20 hover:bg-gray-300/20 hover:text-black-500']:
                  pathname === route.link,
            },
         )}
      >
         <route.icon className="size-5" />
         {route.value}
      </Link>
   );
}
