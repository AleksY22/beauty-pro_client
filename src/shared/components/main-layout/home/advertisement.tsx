'use client';

import Image from 'next/image';

import { useGetAdvertisements } from '@/features/advertisement/hooks/useGetAdvertisements';

export function Advertisement() {
   const { advertisements, isLoading } = useGetAdvertisements();

   return (
      <div className="w-full max-w-360 mx-auto px-4 mb-18.75">
         <div className="flex flex-col lg:flex-row lg:justify-between items-center gap-y-6 lg:gap-x-5">
            {isLoading
               ? Array.from({ length: 3 }).map((_, index) => (
                    <div
                       key={index}
                       className="w-full max-w-116.5 aspect-466/180 bg-gray-100 rounded-[5px] animate-pulse border border-gray-200/50"
                    />
                 ))
               : advertisements?.map((item) => (
                    <div
                       key={item.id}
                       className="relative w-full max-w-116.5 aspect-466/180 rounded-[5px] overflow-hidden shadow-sm group cursor-pointer shrink"
                    >
                       {/* Изображение баннера */}
                       <div className="relative w-full h-full">
                          <Image
                             src={item.image}
                             alt={item.title || 'Рекламный баннер'}
                             fill
                             sizes="(max-w-1200px) 100vw, 466px"
                             className="object-cover transition-transform duration-500 group-hover:scale-103"
                          />
                          {/* Эффект легкого затемнения для читаемости текста */}
                          <div className="absolute inset-0 bg-black/5 transition-opacity group-hover:bg-black/0" />
                       </div>

                       {/* Абсолютно позиционированный текст по вашему CSS */}
                       {item.title && (
                          <div className="absolute inset-0 flex items-center justify-center p-4">
                             <div className="w-full max-w-70 font-bold text-[26px] leading-8 uppercase text-white text-center select-none max-[390px]:text-[20px] max-[390px]:leading-6.5">
                                {item.title}
                             </div>
                          </div>
                       )}
                    </div>
                 ))}
         </div>

         {!isLoading && advertisements?.length === 0 && (
            <div className="text-center py-8 text-gray-400 font-antipasto text-[18px]">
               Нет доступных предложений
            </div>
         )}
      </div>
   );
}
