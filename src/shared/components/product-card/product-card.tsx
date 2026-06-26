import Image from 'next/image';
import Link from 'next/link';

import { formatPrice } from '@/shared/lib/format-price';

import { IProductVariant } from '@/features/product-variant/types/product-variant.interface';

interface ProductCardProps {
   variant: IProductVariant;
   onAddToCart: (id: string) => void;
}

export function ProductCard({ variant, onAddToCart }: ProductCardProps) {
   const { id, price, discount, product, stock } = variant;
   const productImage = product.images?.[0];

   // Переводим цену в число для вычисления скидки
   const currentPriceNum = parseFloat(price) || 0;
   const hasDiscount = discount > 0;

   // Вычисляем цену, если скидка больше нуля
   const newPrice = hasDiscount ? currentPriceNum * (1 - discount / 100) : null;

   const isOutOfStock = stock <= 0;

   return (
      <div className="w-57.5 h-92.5 relative flex flex-col group">
         {/* Ссылка-обертка для контента карточки */}
         <Link
            href={`/catalog/variant/${variant.id}`}
            className="flex-[1_1_auto] flex flex-col no-underline"
         >
            {/* Контейнер изображения (200x200px) */}
            <div className="relative w-50 h-50 mb-5 shrink-0">
               <Image
                  src={productImage}
                  alt={product.title}
                  fill
                  loading="eager"
                  sizes="200px"
                  className="object-contain transition-transform duration-300 group-hover:scale-102"
               />
               {/* Процент скидки */}
               {hasDiscount && (
                  <div className="absolute top-45 left-0 text-[16px] leading-4.75 text-white bg-[#63C8D6] px-1.25 z-10">
                     - {discount}%
                  </div>
               )}
            </div>

            {/* Блок цен */}
            <div className="flex items-center mb-2">
               <span className="text-[20px] font-bold mr-2">
                  {formatPrice(newPrice ?? currentPriceNum)}
               </span>

               {/* Старая цена */}
               {hasDiscount && (
                  <span className="text-[16px] line-through">
                     {formatPrice(currentPriceNum)}
                  </span>
               )}
            </div>

            {/* Название товара с автопереносом строк */}
            <h3 className="text-[14px] leading-tight font-normal mb-2.5 line-clamp-3 break-word">
               {product.title}
            </h3>
         </Link>

         {/* Кнопка "В корзину" */}
         <button
            onClick={() => onAddToCart(id)}
            type="button"
            disabled={isOutOfStock}
            className="w-30 h-9.75 text-black p-[10px_20px] bg-[#F7BAB5] rounded-[3px] text-[14px] leading-none transition-all duration-300 hover:bg-[#f7e1df] disabled:opacity-40 disabled:hover:bg-[#F7BAB5] disabled:cursor-not-allowed"
         >
            {isOutOfStock ? 'Нет в наличии' : 'В корзину'}
         </button>
      </div>
   );
}
