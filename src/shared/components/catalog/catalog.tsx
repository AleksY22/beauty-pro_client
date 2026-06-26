'use client';

import { ProductCard } from '../product-card/product-card2';
import { useSyncExternalStore } from 'react';
import { toast } from 'sonner';

import { useCartStore } from '@/store/useCartStore';

import { ICatalog } from './catalog.interface';
import { Pagination } from './pagination';
import { ProductLoader } from './product-loader';
import { useAddToCart } from '@/features/cart/hooks/useAddToCart';
import { ICartItem } from '@/features/cart/types/cart.interface';

const EMPTY_CART: ICartItem[] = [];

export function Catalog({
   title,
   variants,
   isLoading,
   currentPage = 1,
   totalPages = 1,
   onPageChange,
}: ICatalog) {
   const items = useSyncExternalStore(
      useCartStore.subscribe,
      () => useCartStore.getState().items,
      () => EMPTY_CART,
   );

   // 2. Подключаем мутацию React Query для фонового сохранения в БД
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
         <h2 className="text-[26px] md:text-[36px] text-red-300 font-bold md:leading-10.75 mb-6">
            {title}
         </h2>
         <div className="flex flex-col lg:flex-row gap-6 items-start">
            <div className="flex-1 w-full">
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
                                    addToCartMutation.variables?.variantId ===
                                       variant.id
                                 }
                              />
                           );
                        })
                     )}
                  </div>
               )}
               {!isLoading && onPageChange && (
                  <Pagination
                     currentPage={currentPage}
                     totalPages={totalPages}
                     onPageChange={onPageChange}
                  />
               )}
            </div>
         </div>
      </div>
   );
}
