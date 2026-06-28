'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSyncExternalStore } from 'react';

import Breadcrumbs from '@/shared/components/breadcrumbs';
import { Button } from '@/shared/components/ui';
import { Loading } from '@/shared/components/ui/loader-v2';
import { PUBLIC_URL } from '@/shared/config/url.config';
import { formatPrice } from '@/shared/lib/format-price';

import { useCartStore } from '@/store/useCartStore';

import {
   useCartQuery,
   useRemoveItemMutation,
   useUpdateQuantityMutation,
} from '@/features/cart/hooks/useCart';
import { ICartItem } from '@/features/cart/types/cart.interface';

const EMPTY_CART: ICartItem[] = [];

export function Cart() {
   const breadcrumbsData = [
      { text: 'Каталог', href: `${PUBLIC_URL.category()}` },
      { text: 'Корзина' },
   ];

   const items = useSyncExternalStore(
      useCartStore.subscribe,
      () => useCartStore.getState().items,
      () => EMPTY_CART,
   );

   // Подключаем хуки React Query
   const { data: serverCart = [], isLoading, isError } = useCartQuery();
   const updateQuantityMutation = useUpdateQuantityMutation();
   const removeItemMutation = useRemoveItemMutation();

   // Изменение количества (+ / -)
   const handleQuantityChange = (
      variantId: string,
      currentQty: number,
      newQty: number,
      stock: number,
   ) => {
      if (newQty > stock) return alert(`Максимум доступно: ${stock} шт.`);
      // updateQuantity(variantId, newQty);
      updateQuantityMutation.mutate({ variantId, quantity: newQty });
   };

   // Удаление товара
   const handleRemoveItem = (variantId: string) => {
      // removeItem(variantId);
      removeItemMutation.mutate(variantId);
   };

   // Инициализация чекаута в ЮKassa
   // const handleCheckout = async () => {
   //    try {
   //       const orderDto = {
   //          items: items.map((i) => ({
   //             variantId: i.variantId,
   //             quantity: i.quantity,
   //          })),
   //       };
   //       const response = await apiClient<{ paymentUrl: string }>({
   //          url: '/order/create-payment',
   //          method: 'POST',
   //          data: orderDto,
   //       });
   //       const result = response.data || response;

   //       if (result?.paymentUrl) {
   //          clearCart();
   //          window.location.href = result.paymentUrl; // Переход на ЮKassa
   //       }
   //       // eslint-disable-next-line @typescript-eslint/no-explicit-any
   //    } catch (error: any) {
   //       toast.error(
   //          error?.message ||
   //             'Ошибка генерации платежа. Возможно, вы не авторизованы.',
   //       );
   //    }
   // };

   if (isLoading && items.length > 0)
      return (
         <div className="flex items-center justify-center p-8 text-center text-gray-500">
            <Loading />
         </div>
      );
   if (isError)
      return (
         <div className="p-8 text-center text-red-500">
            Ошибка авторизации или получения данных
         </div>
      );
   if (items.length === 0)
      return (
         <>
            <Breadcrumbs items={breadcrumbsData} />
            <div className="p-8 text-center text-gray-500">
               Ваша корзина пуста
            </div>
         </>
      );

   // Рассчитываем итоговую стоимость на основе реактивного кэша React Query
   const totalPrice = serverCart.reduce((acc, item) => {
      const base = Number(item.variant.price);
      const finalPrice = base - (base * item.variant.discount) / 100;
      return acc + finalPrice * item.quantity;
   }, 0);

   // Сумма ДО скидок (чистая базовая стоимость)
   const baseTotalPrice = serverCart.reduce((acc, item) => {
      return acc + Number(item.variant.price) * item.quantity;
   }, 0);

   // Общая сумма чистой экономии
   const totalDiscount = baseTotalPrice - totalPrice;

   return (
      <>
         <Breadcrumbs items={breadcrumbsData} />
         <div className="w-full mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
               <h1 className="text-2xl font-bold text-red-300">Корзина</h1>

               {serverCart.map((item) => {
                  const basePrice = Number(item.variant.price);
                  const finalPrice =
                     basePrice - (basePrice * item.variant.discount) / 100;

                  return (
                     <div
                        key={item.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between border-b p-3 gap-4"
                     >
                        <div className="flex items-center gap-4">
                           <Image
                              src={item.variant.product.images[0]}
                              alt={item.variant.product.title}
                              width={160}
                              height={160}
                              className="w-20 h-20 object-cover rounded"
                           />
                           <div>
                              <h3 className="font-medium text-sm">
                                 {item.variant.product.title}
                              </h3>
                              <p className="text-xs mt-1">
                                 Артикул: {item.variant.sku}
                              </p>
                           </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-6">
                           {/* Кнопки плюс-минус */}
                           <div className="flex items-center border rounded-md">
                              <button
                                 disabled={
                                    updateQuantityMutation.isPending ||
                                    item.quantity <= 1
                                 }
                                 className="px-3 py-1 disabled:opacity-50"
                                 onClick={() =>
                                    handleQuantityChange(
                                       item.variantId,
                                       item.quantity,
                                       item.quantity - 1,
                                       item.variant.stock,
                                    )
                                 }
                              >
                                 -
                              </button>
                              <span className="px-3 text-sm font-medium w-8 text-center">
                                 {item.quantity}
                              </span>
                              <button
                                 disabled={
                                    updateQuantityMutation.isPending ||
                                    item.quantity >= item.variant.stock
                                 }
                                 className="px-3 py-1 disabled:opacity-50"
                                 onClick={() =>
                                    handleQuantityChange(
                                       item.variantId,
                                       item.quantity,
                                       item.quantity + 1,
                                       item.variant.stock,
                                    )
                                 }
                              >
                                 +
                              </button>
                           </div>

                           <div className="text-center w-30 shrink-0">
                              <p className="font-semibold text-base">
                                 {formatPrice(finalPrice * item.quantity)}
                              </p>
                              {item.variant.discount > 0 && (
                                 <p className="text-xs line-through">
                                    {formatPrice(basePrice * item.quantity)}
                                 </p>
                              )}
                           </div>

                           <button
                              onClick={() => handleRemoveItem(item.variantId)}
                              className="text-gray-400 hover:text-red-400 transition"
                           >
                              ✕
                           </button>
                        </div>
                     </div>
                  );
               })}
            </div>

            {/* Правая панель оформления */}
            <div className="border p-6 rounded-lg h-fit  space-y-4">
               <h2 className="text-lg font-bold">Детали заказа</h2>
               <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                     <span>
                        Товары ({items.reduce((sum, i) => sum + i.quantity, 0)}{' '}
                        шт.):
                     </span>
                     <span className="font-medium">
                        {formatPrice(baseTotalPrice)}
                     </span>
                  </div>

                  {/* Показываем строчку скидки только если она реально есть */}
                  {totalDiscount > 0 && (
                     <div className="flex justify-between">
                        <span>Общая скидка:</span>
                        <span className="font-medium">
                           - {formatPrice(totalDiscount)}
                        </span>
                     </div>
                  )}
               </div>
               <div className="flex justify-between items-baseline pt-2 border-t">
                  <span className="text-base font-medium mr-2">
                     Итого к оплате:
                  </span>
                  <span className="text-2xl font-bold">
                     {formatPrice(totalPrice)}
                  </span>
               </div>
               <Link href={PUBLIC_URL.order()}>
                  <Button className="w-full py-3 rounded-md font-semibold text-sm transition">
                     Оформить заказ
                  </Button>
               </Link>
            </div>
         </div>
      </>
   );
}
