'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { formatPrice } from '@/shared/lib/format-price';

import { IProductVariant } from '@/features/product-variant/types/product-variant.interface';

interface ProductCardProps {
   variant: IProductVariant;
   onAddToCart: (id: string) => void;
   isInCart?: boolean;
   isAdding?: boolean;
}

export function ProductCard({
   variant,
   onAddToCart,
   isInCart,
   isAdding,
}: ProductCardProps) {
   const router = useRouter();
   const [isNavigating, setIsNavigating] = useState(false);

   const { id, price, discount, product, stock } = variant;
   const productImage = product.images?.[0];

   const currentPriceNum = parseFloat(price) || 0;
   const hasDiscount = discount > 0;
   const newPrice = hasDiscount ? currentPriceNum * (1 - discount / 100) : null;
   const isOutOfStock = stock <= 0;

   const handleCardClick = () => {
      setIsNavigating(true);
      router.push(`/variant/${variant.id}`);
   };

   return (
      <div className="w-full h-full relative flex flex-col justify-between p-3 border border-gray-100/60 rounded-md bg-white group hover:shadow-md transition-shadow duration-300">
         <div
            onClick={handleCardClick}
            className="flex flex-col no-underline mb-4 cursor-pointer"
         >
            {isNavigating && (
               <div className="absolute inset-0 z-50 flex items-center justify-center rounded-md animate-fade-in">
                  <div className="w-8 h-8 border-4 border-[#63C8D6] border-t-transparent rounded-full animate-spin"></div>
               </div>
            )}
            <div className="relative w-full max-w-50 mx-auto aspect-square mb-5 shrink-0 flex items-center justify-center">
               <Image
                  src={productImage}
                  alt={product.title}
                  fill
                  loading="eager"
                  sizes="(max-w-768px) 50vw, 200px"
                  className="object-contain transition-transform duration-300 group-hover:scale-102"
               />

               {hasDiscount && (
                  <div className="absolute bottom-0 left-0 text-[14px] font-medium leading-none text-white bg-[#63C8D6] px-2 py-1 z-10 rounded-sm shadow-sm">
                     -{discount}%
                  </div>
               )}
            </div>

            {/* Блок цен */}
            <div className="flex items-baseline flex-wrap gap-x-2 mb-2">
               <span className="text-[20px] font-bold text-black">
                  {formatPrice(newPrice ?? currentPriceNum)}
               </span>

               {/* Старая цена */}
               {hasDiscount && (
                  <span className="text-[14px] text-gray-400 line-through">
                     {formatPrice(currentPriceNum)}
                  </span>
               )}
            </div>

            <h3 className="text-[14px] leading-snug font-normal text-gray-800 mb-2 line-clamp-3 wrap-break-word">
               {product.title}
            </h3>
         </div>

         <button
            onClick={(e) => {
               e.preventDefault();
               e.stopPropagation();
               onAddToCart(id);
            }}
            type="button"
            disabled={isOutOfStock || isAdding || isInCart}
            className="w-full max-w-37 h-10 text-black px-4 bg-[#F7BAB5] rounded-[3px] text-[14px] font-medium leading-none transition-all duration-300 hover:bg-[#f7e1df] disabled:opacity-40 disabled:hover:bg-[#F7BAB5] disabled:cursor-not-allowed mt-auto"
         >
            {isAdding
               ? 'Добавление...'
               : isInCart
                 ? 'В корзине 🛒'
                 : isOutOfStock
                   ? 'Нет на складе'
                   : 'В корзину'}
         </button>
      </div>
   );
}
