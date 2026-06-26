'use client';

import { ProductCard } from '../product-card/product-card2';
import { useState, useSyncExternalStore } from 'react';
import { toast } from 'sonner';

import { useCartStore } from '@/store/useCartStore';

import { ICatalog } from './catalog.interface';
import { Pagination } from './pagination';
import { ProductFilters } from './product-filters';
import { ProductLoader } from './product-loader';
import { useAddToCart } from '@/features/cart/hooks/useAddToCart';
import { ICartItem } from '@/features/cart/types/cart.interface';

const EMPTY_CART: ICartItem[] = [];

export function CatalogWithFilter({
   title,
   variants,
   isLoading,
   currentPage = 1,
   totalPages = 1,
   onPageChange,
   activeFilters,
   onFilterChange,
   availableAttributes,
}: ICatalog) {
   const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

   const items = useSyncExternalStore(
      useCartStore.subscribe,
      () => useCartStore.getState().items,
      () => EMPTY_CART,
   );

   // Подключаем мутацию React Query для фонового сохранения в БД
   const addToCartMutation = useAddToCart();

   const handleAddToCart = (variantId: string) => {
      const currentVariant = variants.find((v) => v.id === variantId);
      if (!currentVariant) {
         toast.error('Ошибка добавления: товар не найден');
         return;
      }

      addToCartMutation.mutate(
         { productId: currentVariant.product.id, variantId, quantity: 1 },
         {
            onSuccess() {
               toast.success('Товар добавлен в корзину!');
            },
            onError() {
               toast.error('Не удалось добавить товар!');
            },
         },
      );
   };

   return (
      <div className="max-w-360 mx-auto px-4 mb-18.75">
         <div className="flex flex-col lg:flex-row gap-6 xl:gap-10 items-start">
            {isMobileFiltersOpen && (
               <div
                  className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300"
                  onClick={() => setIsMobileFiltersOpen(false)}
               />
            )}

            <div
               className={`
               fixed top-0 bottom-0 left-0 w-70 sm:w-[320px] bg-background z-50 p-5 overflow-y-auto shadow-2xl transition-all duration-300
               lg:static lg:w-64 lg:p-0 lg:z-auto lg:shadow-none lg:translate-x-0
               ${isMobileFiltersOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}
            >
               {/* Кнопка закрытия внутри шторки на мобильных */}
               <div className="flex justify-end lg:hidden mb-4">
                  <button
                     onClick={() => setIsMobileFiltersOpen(false)}
                     className="text-gray-400 hover:text-gray-700 font-medium text-sm p-1"
                  >
                     Закрыть
                  </button>
               </div>

               <ProductFilters
                  activeFilters={activeFilters!}
                  onFilterChange={onFilterChange!}
                  availableAttributes={availableAttributes}
               />
            </div>
            <div className="flex-1 w-full flex flex-col">
               <div className="flex items-center justify-between lg:justify-start gap-4 mb-6">
                  <h2 className="text-[24px] sm:text-[26px] md:text-[36px] text-red-300 font-bold leading-tight">
                     {title}
                  </h2>

                  {/* 
                     КНОПКА ДЛЯ МОБИЛЬНЫХ.
                     Показывается только на экранах меньше lg. Прижимает вызов шторки.
                  */}
                  <button
                     type="button"
                     onClick={() => setIsMobileFiltersOpen(true)}
                     className="lg:hidden flex items-center gap-2 bg-[#F7BAB5] text-black text-[14px] font-medium px-4 py-2 rounded-[3px] transition-colors hover:bg-[#f7e1df] shrink-0"
                  >
                     {/* Иконка фильтра */}
                     <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth="2"
                           d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                        />
                     </svg>
                     Фильтр
                  </button>
               </div>
               <div className="w-full">
                  {isLoading ? (
                     <ProductLoader />
                  ) : (
                     <div className="grid grid-cols-[repeat(auto-fill,230px)] gap-x-10 gap-y-7.5 justify-center md:justify-between">
                        {variants.length === 0 ? (
                           <div className="col-span-full text-center py-12">
                              <p className="text-gray-400 font-medium text-[16px]">
                                 В этой категории пока нет доступных товаров
                              </p>
                           </div>
                        ) : (
                           variants?.map((variant) => {
                              const isInCart = items.some(
                                 (item) => item.variantId === variant.id,
                              );

                              return (
                                 <ProductCard
                                    key={variant.id}
                                    variant={variant}
                                    onAddToCart={handleAddToCart}
                                    isInCart={isInCart}
                                    isAdding={
                                       addToCartMutation.isPending &&
                                       addToCartMutation.variables
                                          ?.variantId === variant.id
                                    }
                                 />
                              );
                           })
                        )}
                     </div>
                  )}
                  {!isLoading && onPageChange && (
                     <div className="w-full flex justify-center mt-10">
                        <Pagination
                           currentPage={currentPage}
                           totalPages={totalPages}
                           onPageChange={onPageChange}
                        />
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
}
