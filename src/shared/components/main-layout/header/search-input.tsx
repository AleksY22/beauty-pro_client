'use client';

import { Button, Input } from '../../ui';
import { Loader2, Search, SearchX, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { useClickAway } from 'react-use';

import { cn } from '@/shared/lib/utils';

import { productService } from '@/features/product/services/product.service';

interface IVariant {
   id: string;
   price: string | number;
   discount?: number;
   stock: number;
}

interface IProduct {
   id: string;
   title: string;
   images: string[];
   variants: IVariant[];
}

interface Props {
   className?: string;
}

export function SearchInput({ className }: Props) {
   const router = useRouter();
   const searchParams = useSearchParams();

   const initialSearch = searchParams.get('searchTerm') || '';

   const [searchTerm, setSearchTerm] = useState<string>(initialSearch);
   const [focused, setFocused] = useState<boolean>(false);
   const [products, setProducts] = useState<IProduct[]>([]);
   const [isLoading, setIsLoading] = useState<boolean>(false);

   const [prevInitialSearch, setPrevInitialSearch] =
      useState<string>(initialSearch);

   const ref = useRef<HTMLDivElement>(null);

   if (initialSearch !== prevInitialSearch) {
      setSearchTerm(initialSearch);
      setPrevInitialSearch(initialSearch);
   }

   useClickAway(ref, () => {
      setFocused(false);
   });

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchTerm(value);

      if (value.trim()) {
         setIsLoading(true);
      } else {
         setIsLoading(false);
         setProducts([]);
      }
   };

   // Функция для быстрой очистки инпута
   const handleClear = () => {
      setSearchTerm('');
      setProducts([]);
      setIsLoading(false);
   };

   useEffect(() => {
      const trimmed = searchTerm.trim();
      if (!trimmed) return;

      // Флаг актуальности текущего запроса (защита от Race Condition)
      const requestState = { isCurrent: true };

      const delayDebounceFn = setTimeout(async () => {
         try {
            const response = await productService.getAll(trimmed);

            // Если за 300мс юзер ввел новый символ — игнорируем ответ этого запроса
            if (!requestState.isCurrent) return;

            // УНИВЕРСАЛЬНАЯ ПРОВЕРКА СТРУКТУРЫ ОТВЕТА
            if (response) {
               if (Array.isArray(response)) {
                  // Если сервер вернул прямой массив
                  setProducts(response.slice(0, 5));
               } else if (
                  response.products &&
                  Array.isArray(response.products)
               ) {
                  // Если сервер вернул объект
                  setProducts(response.products.slice(0, 5));
               } else {
                  setProducts([]);
               }
            } else {
               setProducts([]);
            }
         } catch (error) {
            console.error('Ошибка при поиске:', error);
            if (requestState.isCurrent) setProducts([]);
         } finally {
            if (requestState.isCurrent) setIsLoading(false);
         }
      }, 300);

      return () => clearTimeout(delayDebounceFn);
   }, [searchTerm]);

   const handleSearchSubmit = () => {
      setFocused(false);
      const trimmed = searchTerm.trim();

      if (!trimmed) {
         router.push('/explorer');
         return;
      }

      const encodedQuery = encodeURIComponent(trimmed);
      router.push(`/explorer?searchTerm=${encodedQuery}`);
   };

   const handleItemClick = () => {
      setFocused(false);
      setProducts([]);
   };

   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
         handleSearchSubmit();
      }
   };

   // Безопасное извлечение цены из массива вариантов
   const getProductPriceInfo = (product: IProduct) => {
      if (
         !product.variants ||
         !Array.isArray(product.variants) ||
         product.variants.length === 0
      ) {
         return null;
      }

      // Берем именно ПЕРВЫЙ элемент массива [0]
      const mainVariant = product.variants[0];
      if (!mainVariant || !mainVariant.price) return null;

      const basePrice = Number(mainVariant.price);
      if (isNaN(basePrice)) return null; // Защита от кривых данных

      const discount = mainVariant.discount || 0;

      if (discount > 0) {
         const finalPrice = Math.round(basePrice * (1 - discount / 100));
         return { basePrice, finalPrice, hasDiscount: true };
      }

      return { basePrice, finalPrice: basePrice, hasDiscount: false };
   };

   const showNotFound =
      focused && searchTerm.trim() && !isLoading && products.length === 0;

   return (
      <>
         {focused && (
            <div className="fixed inset-0 bg-black/40 z-40 transition-opacity duration-200" />
         )}

         <div
            ref={ref}
            className={cn(
               'flex items-center relative w-full max-w-md z-50',
               className,
            )}
         >
            <div className="relative flex-1 flex items-center">
               <Input
                  placeholder="Поиск товаров..."
                  value={searchTerm}
                  onChange={handleInputChange}
                  onFocus={() => setFocused(true)}
                  onKeyDown={handleKeyDown}
                  className="rounded-lg rounded-r-none focus-visible:ring-transparent pr-4 border-2 border-red-300 h-10 w-full"
               />

               {searchTerm && (
                  <button
                     type="button"
                     onClick={handleClear}
                     className="absolute right-3 p-1 rounded-full text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                     <X className="size-4" />
                  </button>
               )}
            </div>

            <Button
               className="rounded-l-none h-10 border-2 border-l-0 border-red-300 bg-red-400 hover:bg-red-500"
               onClick={handleSearchSubmit}
               disabled={isLoading}
            >
               {isLoading ? (
                  <Loader2 className="size-4 animate-spin" />
               ) : (
                  <Search className="size-4" />
               )}
            </Button>

            {/* Выпадающий список результатов */}
            {focused && products.length > 0 && (
               <div className="absolute w-full bg-white rounded-xl py-2 top-12 shadow-xl border border-gray-100 transition-all duration-200 max-h-95 overflow-y-auto">
                  <div className="px-3 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                     Быстрые результаты
                  </div>

                  {products.map((product) => {
                     const priceInfo = getProductPriceInfo(product);
                     // Строгая проверка наличия первой картинки в массиве
                     const imageUrl =
                        product.images && product.images.length > 0
                           ? product.images[0]
                           : null;

                     return (
                        <Link
                           href={`/product/${product.id}`}
                           key={product.id}
                           onClick={handleItemClick}
                           className="flex items-center gap-3 px-3 py-2 hover:bg-red-50/50 transition-colors cursor-pointer border-b border-gray-50 last:border-none"
                        >
                           <div className="relative size-10 rounded-md overflow-hidden bg-gray-50 shrink-0 border border-gray-100">
                              {imageUrl ? (
                                 <Image
                                    src={imageUrl}
                                    alt={product.title}
                                    fill
                                    className="object-cover"
                                    sizes="40px"
                                    unoptimized // Временно отключаем оптимизацию, если домен еще не прописан в next.config.js
                                 />
                              ) : (
                                 <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-300">
                                    Нет фото
                                 </div>
                              )}
                           </div>

                           <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium text-gray-800 truncate">
                                 {product.title}
                              </div>
                           </div>

                           {priceInfo && (
                              <div className="text-right shrink-0 flex flex-col justify-center">
                                 {priceInfo.hasDiscount ? (
                                    <>
                                       <span className="text-xs text-gray-400 line-through leading-none">
                                          {priceInfo.basePrice} ₽
                                       </span>
                                       <span className="text-sm font-bold text-red-400 leading-tight">
                                          {priceInfo.finalPrice} ₽
                                       </span>
                                    </>
                                 ) : (
                                    <span className="text-sm font-semibold text-gray-700">
                                       {priceInfo.basePrice} ₽
                                    </span>
                                 )}
                              </div>
                           )}
                        </Link>
                     );
                  })}

                  <button
                     onClick={handleSearchSubmit}
                     className="w-full text-center py-2 mt-1 text-red-300 text-xs font-medium hover:text-red-400 block cursor-pointer sticky bottom-0"
                  >
                     Показать все результаты
                  </button>
               </div>
            )}

            {showNotFound && (
               <div className="absolute w-full bg-white rounded-xl p-5 top-12 shadow-xl border border-gray-100 transition-all duration-200 text-center flex flex-col items-center justify-center gap-2">
                  <SearchX className="size-8 text-gray-300" />
                  <div className="text-sm font-medium text-gray-600">
                     Ничего не найдено
                  </div>
                  <div className="text-xs text-gray-400 max-w-62.5">
                     Попробуйте изменить запрос или перейти в каталог
                  </div>
               </div>
            )}
         </div>
      </>
   );
}

//============================Статичный поиск============================
// import { Button, Input } from '../../ui';
// import { Search } from 'lucide-react';
// import { useRouter } from 'next/navigation';
// import { useState } from 'react';

// import { PUBLIC_URL } from '@/shared/config/url.config';

// export function SearchInput() {
//    const [searchTerm, setSearchTerm] = useState<string>('');

//    const router = useRouter();

//    const handleSearch = () => {
//       const trimmedSearch = searchTerm.trim();

//       if (!trimmedSearch) {
//          // Если строка пустая, отправляем на базовый URL каталога
//          router.push(PUBLIC_URL.explorer());
//          return;
//       }

//       // Безопасно кодируем строку для URL (заменяет пробелы на %20 и т.д.)
//       const encodedQuery = encodeURIComponent(trimmedSearch);
//       router.push(PUBLIC_URL.explorer(`?searchTerm=${encodedQuery}`));
//    };

//    // Позволяет отправлять запрос при нажатии Enter
//    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//       if (e.key === 'Enter') {
//          handleSearch();
//       }
//    };

//    return (
//       <div className="flex items-center relative">
//          <Input
//             placeholder="Поиск товаров..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             onKeyDown={handleKeyDown}
//             className="rounded-lg rounded-r-none focus-visible:ring-transparent pr-8 border-2 border-red-300"
//          />
//          <Button className="rounded-l-none" onClick={handleSearch}>
//             <Search className="size-4" />
//          </Button>
//       </div>
//    );
// }

//===================================Динамический поиск============================
// import { Search } from 'lucide-react';
// import Link from 'next/link';
// import { useRef, useState } from 'react';
// import { useClickAway, useDebounce } from 'react-use';

// import { cn } from '@/shared/lib/utils';

// import { productService } from '@/features/product/services/product.service';
// import { IProduct } from '@/features/product/types/product.interface';

// interface Props {
//    className?: string;
// }

// export const SearchInput: React.FC<Props> = ({ className }) => {
//    const [searchQuery, setSearchQuery] = useState('');
//    const [focused, setFocused] = useState(false);
//    const [products, setProducts] = useState<IProduct[]>([]);
//    const ref = useRef(null);

//    useClickAway(ref, () => {
//       setFocused(false);
//    });

//    useDebounce(
//       async () => {
//          if (!searchQuery.trim()) {
//             setProducts([]);
//             return;
//          }
//          try {
//             const response = await productService.getAll(searchQuery);
//             if (response && response.products) {
//                setProducts(response.products);
//             } else {
//                setProducts([]);
//             }
//          } catch (error) {
//             console.log(error);
//             setProducts([]);
//          }
//       },
//       250,
//       [searchQuery],
//    );

//    const onClickItem = () => {
//       setFocused(false);
//       setSearchQuery('');
//       setProducts([]);
//    };

//    return (
//       <>
//          {focused && (
//             <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-18" />
//          )}
//          <div
//             ref={ref}
//             className={cn(
//                'flex rounded-2xl flex-1 justify-between relative h-11 z-18',
//                className,
//             )}
//          >
//             <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
//             <input
//                type="text"
//                name="search"
//                className="rounded-xl outline-none w-full pl-11 border-2 border-red-300"
//                placeholder="Например: Лак для волос"
//                onFocus={() => setFocused(true)}
//                value={searchQuery}
//                onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             {products.length > 0 && focused && (
//                <div
//                   className={cn(
//                      'absolute w-full rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
//                      focused && 'visible opacity-100 top-12',
//                   )}
//                >
//                   {products.map((product) => (
//                      <Link
//                         href={`/product/${product.id}`}
//                         key={product.id}
//                         onClick={onClickItem}
//                      >
//                         <div className="px-3 py-2 hover:bg-primary/10">
//                            {product.title}
//                         </div>
//                      </Link>
//                   ))}
//                </div>
//             )}
//          </div>
//       </>
//    );
// };
