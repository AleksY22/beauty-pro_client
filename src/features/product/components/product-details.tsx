'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useSyncExternalStore } from 'react';
import { toast } from 'sonner';

import { formatPrice } from '@/shared/lib/format-price';

import { useCartStore } from '@/store/useCartStore';

import { useAddToCart } from '@/features/cart/hooks/useAddToCart';
import { ICartItem } from '@/features/cart/types/cart.interface';
import { IProductVariant } from '@/features/product-variant/types/product-variant.interface';

const EMPTY_CART: ICartItem[] = [];

interface ProductDetailsProps {
   variant: IProductVariant;
}

export function ProductDetails({ variant }: ProductDetailsProps) {
   const router = useRouter();
   const [loadingVariantId, setLoadingVariantId] = useState<string | null>(
      null,
   );

   const { price, product, discount, stock } = variant;

   const items = useSyncExternalStore(
      useCartStore.subscribe,
      () => useCartStore.getState().items,
      () => EMPTY_CART,
   );
   const isInCart = items.some((item) => item.variantId === variant.id);

   // Подключаем мутацию React Query для фонового сохранения в БД
   const addToCartMutation = useAddToCart();

   // Переводим цену в число для вычисления скидки
   const currentPriceNum = parseFloat(price) || 0;
   const hasDiscount = discount > 0;

   // Вычисляем цену, если скидка больше нуля
   const newPrice = hasDiscount ? currentPriceNum * (1 - discount / 100) : null;

   // Вычисляем средний рейтинг на основе отзывов
   const reviewsCount = product.reviews?.length || 0;
   const averageRating =
      reviewsCount > 0
         ? Math.round(
              (product.reviews!.reduce((acc, r) => acc + r.rating, 0) /
                 reviewsCount) *
                 10,
           ) / 10
         : 0;

   // Стейт для активного (большого) изображения в галерее
   const productImages = product.images?.length
      ? product.images
      : ['no-user-image.png'];
   const [activeImage, setActiveImage] = useState(productImages[0]);

   // Вычисляем процент заполнения звезд рейтинга (для золотой заливки)
   const ratingPercentage = (averageRating / 5) * 100;

   const handleAddToCart = (variantId: string, productId: string) => {
      // Если в express-session есть активная сессия, дублируем запрос на бэкенд
      addToCartMutation.mutate(
         { productId, variantId, quantity: 1 },
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

   const [isHovered, setIsHovered] = useState(false);
   const isAvailable = stock > 0 && !isInCart;
   const isAdding = addToCartMutation.isPending;

   return (
      <div className="w-full mb-18.75">
         <div className="w-full max-w-360 mx-auto px-4">
            {/* Заголовок товара */}
            <h1 className="text-[28px] md:text-[36px] font-semibold tracking-wide mb-3">
               {product.title}
            </h1>
            {/* Подзаголовок: Скидка, Рейтинг, Количество отзывов */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-8 pb-3 text-[14px] border-b border-[#DBEDED]">
               {/* Метка скидки (показываем, только если discount > 0) */}
               {variant.discount > 0 && (
                  <div className="bg-[#63C8D6] text-white font-bold px-2.5 py-1 text-[14px] uppercase rounded-[3px] tracking-wider">
                     -{variant.discount}%
                  </div>
               )}

               {/* Звездный рейтинг (Интеграция вашей структуры .product__rating) */}
               <div className="flex items-center gap-2">
                  <div className="relative text-gray-200 text-[18px] tracking-[3px] select-none before:content-['★★★★★']">
                     {/* Активный слой звезд, закрашивающийся золотым цветом в зависимости от рейтинга */}
                     <div
                        className="absolute top-0 left-0 text-yellow-400 overflow-hidden before:content-['★★★★★']"
                        style={{ width: `${ratingPercentage}%` }}
                     />
                  </div>
                  <span className="font-semibold text-gray-700 text-[15px]">
                     {averageRating > 0 ? averageRating : '0.0'}
                  </span>
               </div>

               {/* Количество отзывов */}
               <div className="text-gray-400">
                  отзывов:{' '}
                  <span className="text-gray-400 font-medium">
                     {reviewsCount}
                  </span>
               </div>
            </div>

            <div className="flex flex-col flex-wrap md:flex-row gap-6 w-full max-w-4xl mx-auto p-4">
               {/* ЛЕВАЯ КОЛОНКА: Галерея картинок товара */}
               <div
                  className="w-full overflow-hidden rounded-lg"
                  style={{ maxWidth: '420px' }}
               >
                  {/* 1. Ячейка главного большого изображения */}
                  <div className="aspect-square relative bg-gray-50 border border-gray-100 rounded-md overflow-hidden mb-4">
                     <Image
                        src={activeImage}
                        alt={product.title}
                        fill
                        sizes="420px"
                        className="rounded-lg object-contain p-2"
                     />
                  </div>

                  {/* 2. Полоса миниатюр */}
                  <div className="flex flex-nowrap gap-3 overflow-x-auto p-2 scrollbar-none w-full shrink-0">
                     {productImages.map((imgUrl, index) => {
                        const isCurrent = activeImage === imgUrl;
                        return (
                           <button
                              key={index}
                              type="button"
                              onClick={() => setActiveImage(imgUrl)}
                              className={`w-12 h-auto shrink-0 bg-white border rounded-md overflow-hidden p-2 transition-all ${
                                 isCurrent
                                    ? 'border-[#F7BAB5] ring-2 ring-[#F7BAB5]'
                                    : 'border-gray-200 hover:border-gray-400'
                              }`}
                           >
                              <Image
                                 src={imgUrl}
                                 alt={`Превью ${index + 1}`}
                                 width={75}
                                 height={75}
                                 className="object-fill"
                                 style={{ width: 'auto', height: 'auto' }}
                              />
                           </button>
                        );
                     })}
                  </div>
               </div>

               {/* ПРАВАЯ КОЛОНКА: Спецификации, Выбор цвета */}
               <div className="flex-1/3">
                  {/* Спецификация: ЦВЕТ */}
                  {variant.color && (
                     <div className="mb-8">
                        <div className="text-[14px] font-semibold text-gray-400 tracking-wider uppercase mb-2">
                           Варианты:
                        </div>

                        {/* Слайдер-лента других доступных вариаций */}
                        <div className="flex flex-wrap gap-4 overflow-x-auto p-2 scrollbar-none">
                           {product.variants?.map((v) => {
                              if (!v.color) return null;
                              const isCurrent = v.id === variant.id;
                              const isLoading = loadingVariantId === v.id;

                              return (
                                 <div
                                    key={v.id}
                                    onClick={() => {
                                       if (isCurrent || isLoading) return;
                                       setLoadingVariantId(v.id);
                                       router.push(`/variant/${v.id}`, {
                                          scroll: false,
                                       });
                                    }}
                                    className={`relative overflow-hidden flex flex-col items-center gap-2 p-2 border rounded-md cursor-pointer transition-all shrink-0 w-24 bg-white ${
                                       isCurrent
                                          ? 'border-[#F7BAB5] ring-2 ring-[#F7BAB5]'
                                          : 'border-gray-200 hover:border-gray-400'
                                    } ${isLoading ? 'opacity-80 pointer-events-none' : ''}`}
                                 >
                                    {isLoading && (
                                       <div className="absolute inset-0 flex items-center justify-center bg-white rounded-full z-10">
                                          <div className="w-5 h-5 border-2 border-[#F7BAB5] border-t-transparent rounded-full animate-spin"></div>
                                       </div>
                                    )}
                                    <div
                                       className={`w-8 h-8 rounded-full border border-gray-300 shadow-sm transition-transform ${
                                          isLoading ? 'scale-0' : 'scale-100'
                                       }`}
                                       style={{
                                          backgroundColor: v.color.value,
                                       }}
                                       title={v.color.name}
                                    />
                                    <span className="text-[11px] text-gray-600 text-center truncate w-full font-medium">
                                       {v.color.name}
                                    </span>
                                 </div>
                              );
                           })}
                        </div>
                     </div>
                  )}
                  {/* Динамические свойства / Характеристики */}
                  {variant.properties && variant.properties.length > 0 && (
                     <div className="space-y-2 mb-5 ">
                        <div className="text-[14px] font-semibold text-gray-500 uppercase tracking-wider mb-2">
                           Характеристики:
                        </div>
                        <div className="grid grid-cols-1 gap-x-5 gap-y-3">
                           {variant.properties.map((prop) => (
                              <div
                                 key={prop.id}
                                 className="flex justify-between pb-1.5 text-[14px]"
                              >
                                 <span className="text-gray-400 mr-7">
                                    {prop.attribute.name}
                                 </span>
                                 <span className="font-medium">
                                    {prop.value}
                                 </span>
                              </div>
                           ))}
                        </div>
                     </div>
                  )}
               </div>
               <div className="flex flex-col">
                  <div
                     className="rounded-[5px] text-center w-full p-5"
                     style={{ backgroundColor: '#DBEDED', minWidth: '280px' }}
                  >
                     <div className="flex items-center justify-center mb-2">
                        <span className="text-[20px] font-bold mr-2 text-gray-700">
                           {formatPrice(newPrice ?? currentPriceNum)}
                        </span>

                        {/* Старая цена */}
                        {hasDiscount && (
                           <span className="text-[16px] line-through text-gray-500">
                              {formatPrice(currentPriceNum)}
                           </span>
                        )}
                     </div>
                     <button
                        onClick={() => handleAddToCart(variant.id, product.id)}
                        type="button"
                        disabled={!isAvailable || isInCart || isAdding}
                        onMouseEnter={() => isAvailable && setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        style={{
                           backgroundColor: isAvailable
                              ? isHovered
                                 ? '#4892A0'
                                 : '#59AAB9'
                              : '#9CA3AF',
                        }}
                        className={`w-full max-w-70 rounded-2xl py-3 px-4 text-[20px] text-white font-medium transition-all ${
                           !isAvailable || isInCart
                              ? 'cursor-not-allowed opacity-70'
                              : ''
                        }`}
                     >
                        {isAdding
                           ? 'Добавление...'
                           : isInCart
                             ? 'В корзине 🛒'
                             : isAvailable
                               ? 'Добавить в корзину'
                               : 'Нет в наличии'}
                     </button>
                  </div>
               </div>
            </div>

            <div className="pt-4">
               <div className="text-[14px] font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Описание:
               </div>
               <p className="text-gray-500 text-[15px] leading-relaxed">
                  {product.description ||
                     'Описание для данного товара временно отсутствует.'}
               </p>
            </div>
         </div>
      </div>
   );
}
