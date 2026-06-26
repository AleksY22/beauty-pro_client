import Image from 'next/image';
import Link from 'next/link';

import { PUBLIC_URL } from '@/shared/config/url.config';
import { cn } from '@/shared/lib/utils';

interface Props {
   className?: string;
}

export function Logo({ className }: Props) {
   return (
      <Link
         href={PUBLIC_URL.home()}
         className={cn(
            'w-36 sm:w-44 md:w-52 lg:w-56 xl:w-64 shrink-0',
            className,
         )}
      >
         <Image
            src="/logo.png"
            alt="Логотип"
            className="w-full h-auto object-contain"
            width={180}
            height={50}
            loading="eager"
         />
      </Link>
   );
}
