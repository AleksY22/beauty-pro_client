'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useGetPromotions } from '@/features/promotion/hooks/useGetPromotions';
import { IPromotion } from '@/features/promotion/types/promotion.interface';

export function Promotions() {
   const { promotions, isLoading } = useGetPromotions();

   return (
      <div className="w-full max-w-360 mx-auto px-4 mb-18.75">
         <h2 className="text-[26px] md:text-[36px] text-red-300 font-bold md:leading-10.75 mb-6">
            Рекламные акции
         </h2>
         <div className="flex flex-wrap justify-between gap-5">
            {isLoading
               ? Array.from({ length: 8 }).map((_, index) => (
                    <div
                       key={index}
                       className="w-39.5 h-53.5 rounded-[5px] bg-gray-200 animate-pulse"
                    />
                 ))
               : promotions?.map((promotion: IPromotion) => (
                    <Link
                       key={promotion.id}
                       href={`/promotions/${promotion.id}`}
                       className="relative w-39.5 h-53.5 rounded-[5px] overflow-hidden shrink-0 group block"
                    >
                       <Image
                          src={promotion.image}
                          alt={`${promotion.title} - ${promotion.date}`}
                          fill
                          sizes="158px"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          priority={false}
                       />
                       <div className="absolute bottom-3.75 left-0 w-full px-2.5 text-center text-[16px] leading-4.75 text-black z-10 flex flex-col items-center gap-1">
                          <p className="font-medium bg-white/70 backdrop-blur-[2px] rounded py-0.5 px-2 w-fit max-w-full wrap-break-word">
                             {promotion.title}
                          </p>
                          <p className="text-sm bg-white/70 backdrop-blur-[2px] rounded py-0.5 px-2 opacity-80 w-fit wrap-break-word">
                             {promotion.date}
                          </p>
                       </div>
                    </Link>
                 ))}
         </div>
      </div>
   );
}
