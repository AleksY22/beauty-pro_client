'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useGetCategories } from '@/features/category/hooks/useGetCategories';
import { ICategory } from '@/features/category/types/category.interface';

interface CatalogTitle {
   title: string;
}

export function PopularCategories({ title }: CatalogTitle) {
   const { categories, isLoading } = useGetCategories();

   // Состояние загрузки (скелетоны одинакового размера)
   if (isLoading) {
      return (
         <div className="category mb-18.75 w-full animate-pulse">
            <div className="max-w-360 mx-auto px-4">
               <div className="h-10.75 w-64 bg-neutral-200 rounded-md mb-8.75" />
               {/* Сетка скелетонов одинакового размера */}
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {[1, 2, 3].map((i) => (
                     <div
                        key={i}
                        className="w-full h-50 bg-neutral-200 rounded-lg"
                     />
                  ))}
               </div>
            </div>
         </div>
      );
   }

   // Если категорий нет, скрываем секцию
   if (!categories || categories.length === 0) return null;

   return (
      <div className="mb-18.75 w-full">
         <div className="max-w-360 mx-auto px-4">
            <h2 className="text-[26px] md:text-[36px] text-red-300 font-bold md:leading-10.75 mb-6">
               {title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
               {categories.map((category: ICategory) => {
                  // Разделяем имя по " / " или " и ", если нужно переносить строки, как в старом дизайне
                  const titleLines = category.title
                     ? category.title.split('/')
                     : ['Без названия'];

                  return (
                     <Link
                        key={category.id}
                        href={`/category/${category.id}`}
                        className="relative block w-full h-50 group overflow-hidden rounded-lg bg-neutral-100 transition-all duration-300 hover:shadow-md"
                     >
                        <Image
                           src={category.image}
                           alt={category.title}
                           fill
                           loading="eager"
                           sizes="(max-w-640px) 100vw, (max-w-1024px) 50vw, 33vw"
                           className="object-cover transition-transform duration-300 group-hover:scale-103"
                        />

                        {/* Градиентное затемнение, чтобы черный/белый текст лучше читался на любых картинках */}
                        <div className="absolute inset-0 bg-linear-to-b from-black/10 via-transparent to-transparent z-0" />

                        <div className="absolute top-0 left-0 p-[15px_30px] text-[26px] font-semibold leading-7.75 text-gray-600 z-10">
                           {titleLines.map((line: string, lineIdx: number) => (
                              <p key={lineIdx}>{line}</p>
                           ))}
                        </div>
                     </Link>
                  );
               })}
            </div>
         </div>
      </div>
   );
}
