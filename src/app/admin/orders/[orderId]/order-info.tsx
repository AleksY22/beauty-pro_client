'use client';

import { useQuery } from '@tanstack/react-query';
import {
   ArrowLeft,
   Calendar,
   CreditCard,
   ShoppingBag,
   Truck,
   User,
} from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import { ConfirmModal } from '@/shared/components/confirm-modal';
import {
   Button,
   Card,
   CardContent,
   CardHeader,
   CardTitle,
   Loading,
} from '@/shared/components/ui';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/shared/components/ui/select';
import { formatPrice } from '@/shared/lib/format-price';

import { useUpdateOrderStatus } from '@/features/order/hooks/useUpdateOrderStatus';
import { orderService } from '@/features/order/services/order.service';
import { STATUS_TRANSLATIONS } from '@/features/order/types/order.interface';

export function OrderInfo() {
   const params = useParams<{ orderId: string }>();
   const router = useRouter();
   const [pendingStatus, setPendingStatus] = useState<string | null>(null);

   const {
      data: order,
      isLoading,
      error,
   } = useQuery({
      queryKey: ['get order', params.orderId],
      queryFn: () => orderService.getById(params.orderId!),
      enabled: !!params.orderId,
   });

   // Подключаем хук мутации обновления статуса
   const { mutate: updateStatus, isPending: isUpdating } =
      useUpdateOrderStatus();

   if (isLoading)
      return (
         <div className="p-6 text-center text-muted-foreground animate-pulse">
            <Loading />
         </div>
      );
   if (error || !order)
      return (
         <div className="p-6 text-center text-destructive">
            Ошибка при загрузке данных заказа.
         </div>
      );

   const statusInfo = STATUS_TRANSLATIONS[order.status] || {
      text: order.status,
      color: 'bg-gray-100 text-gray-800',
   };

   return (
      <div className="p-6 max-w-5xl mx-auto space-y-6">
         {/* Шапка страницы */}
         <div className="flex items-center justify-between flex-wrap">
            <div className="flex items-center gap-4 mb-2">
               <Button
                  variant="outline"
                  size="icon"
                  onClick={() => router.back()}
               >
                  <ArrowLeft className="size-4" />
               </Button>
               <div>
                  <h1 className="text-lg lg:text-2xl font-bold tracking-tight">
                     Заказ{' '}
                     <span className="text-muted-foreground">
                        ID: {order.id}
                     </span>
                  </h1>
               </div>
            </div>
            <div className="flex items-center gap-2">
               <span className="text-xs text-muted-foreground font-medium hidden md:inline">
                  Статус заказа:
               </span>
               <Select
                  value={order.status}
                  // Блокируем селектор при отправке запроса или если заказ уже в финальной стадии
                  disabled={
                     isUpdating ||
                     order.status === 'CANCELLED' ||
                     order.status === 'COMPLETED'
                  }
                  onValueChange={(newStatus) => setPendingStatus(newStatus)}
               >
                  <SelectTrigger
                     className={`w-55 h-10 text-sm font-medium border-neutral-200 ${statusInfo.color}`}
                  >
                     <SelectValue placeholder="Выберите статус" />
                  </SelectTrigger>

                  <SelectContent>
                     <SelectItem value="PENDING">В ожидании</SelectItem>
                     <SelectItem value="PAID_AND_WAITING">
                        Оплачен, в обработке
                     </SelectItem>
                     <SelectItem value="PAID_AND_DELIVERING">
                        Оплачен, доставляется
                     </SelectItem>
                     <SelectItem value="DELIVERING">
                        Неоплачен, доставляется
                     </SelectItem>
                     <SelectItem
                        value="COMPLETED"
                        className="text-emerald-600 font-medium focus:text-emerald-600"
                     >
                        Завершен
                     </SelectItem>
                     <SelectItem
                        value="CANCELLED"
                        className="text-destructive font-medium focus:text-destructive"
                     >
                        {order.status === 'CANCELLED'
                           ? 'Отменен'
                           : 'Отменить заказ'}
                     </SelectItem>
                  </SelectContent>
               </Select>
               <ConfirmModal
                  open={!!pendingStatus}
                  onOpenChange={(isOpen) => {
                     if (!isOpen) setPendingStatus(null); // Если закрыли (нажали Отмена или мимо) — очищаем
                  }}
                  handleClick={() => {
                     if (pendingStatus) {
                        updateStatus({
                           orderId: order.id,
                           status: pendingStatus,
                        });
                        setPendingStatus(null); // Очищаем после успешного клика
                     }
                  }}
               />
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Левая колонка: Состав заказа */}
            <div className="md:col-span-2 space-y-6">
               <Card>
                  <CardHeader>
                     <CardTitle className="text-lg flex items-center gap-2">
                        <ShoppingBag className="size-5 text-muted-foreground" />
                        Содержимое заказа
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="divide-y divide-border">
                     {order.items.map((item) => (
                        <div
                           key={item.id}
                           className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
                        >
                           <div className="relative size-16 rounded-md overflow-hidden bg-secondary shrink-0">
                              <Image
                                 src={
                                    item.variant.product.images[0] ||
                                    '/placeholder.png'
                                 }
                                 alt={item.variant.product.title}
                                 fill
                                 sizes="64px"
                                 className="object-cover"
                              />
                           </div>
                           <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm truncate">
                                 {item.variant.product.title}
                              </h4>
                              <p className="text-xs text-muted-foreground mt-0.5 space-x-2">
                                 {item.variant.color && (
                                    <span>Цвет: {item.variant.color.name}</span>
                                 )}
                                 <span>Кол-во: {item.quantity} шт.</span>
                              </p>
                           </div>
                           <div className="text-sm font-semibold text-right">
                              {formatPrice(
                                 item.priceAtPurchase * item.quantity,
                              )}
                              <p className="text-xs font-normal text-muted-foreground">
                                 {formatPrice(Number(item.priceAtPurchase))}/шт.
                              </p>
                           </div>
                        </div>
                     ))}
                  </CardContent>
               </Card>
               <Card>
                  <CardHeader>
                     <CardTitle className="text-lg flex items-center gap-2">
                        <Truck className="size-5 text-muted-foreground" />
                        Доставка и получение
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-4">
                     <div className="flex items-start justify-between border-b border-border pb-3">
                        <div>
                           <span className="text-muted-foreground text-xs block">
                              Способ оплаты
                           </span>
                           <span className="font-medium text-neutral-600">
                              {order.paymentMethod?.name || 'Не указан'}
                           </span>
                        </div>
                     </div>
                     <div className="flex items-start justify-between border-b border-border pb-3">
                        <div>
                           <span className="text-muted-foreground text-xs block">
                              Способ доставки
                           </span>
                           <span className="font-medium text-neutral-600">
                              {order.deliveryMethod?.name || 'Не указан'}
                           </span>
                        </div>
                     </div>

                     <div className="border-b border-border pb-3">
                        <span className="text-muted-foreground text-xs block">
                           Адрес доставки
                        </span>
                        <span className="font-medium text-neutral-600">
                           {order.address || 'Не указан'}
                        </span>
                     </div>

                     {order.comment && (
                        <div className="rounded-lg p-3 border flex gap-2.5 items-start">
                           <div>
                              <span className="text-muted-foreground text-xs block">
                                 Комментарий к заказу
                              </span>
                              <p className="text-neutral-600 text-xs mt-0.5 italic">
                                 {order.comment}
                              </p>
                           </div>
                        </div>
                     )}
                  </CardContent>
               </Card>
            </div>

            {/* Правая колонка: Детали оплаты и Пользователь */}
            <div className="space-y-6">
               {/* Покупатель */}
               <Card>
                  <CardHeader>
                     <CardTitle className="text-lg flex items-center gap-2">
                        <User className="size-5 text-muted-foreground" />
                        Покупатель
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2">
                     <div>
                        <span className="text-muted-foreground block text-xs">
                           Имя
                        </span>
                        <span className="font-medium">
                           {order.firstName} {order.lastName || ''}
                        </span>
                     </div>
                     <div>
                        <span className="text-muted-foreground block text-xs">
                           Email
                        </span>
                        <span className="font-medium">{order.email}</span>
                     </div>
                     <div>
                        <span className="text-muted-foreground block text-xs">
                           Телефон
                        </span>
                        <span className="font-medium text-neutral-500">
                           {order.phone}
                        </span>
                     </div>
                  </CardContent>
               </Card>

               {/* Детали платежа */}
               <Card>
                  <CardHeader>
                     <CardTitle className="text-lg flex items-center gap-2">
                        <CreditCard className="size-5 text-muted-foreground" />
                        Оплата
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-3">
                     <div className="flex items-center justify-between">
                        <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
                           <Calendar className="size-3.5" /> Дата создания
                        </span>
                        <span className="font-medium">
                           {new Date(order.createdAt).toLocaleString('ru-RU')}
                        </span>
                     </div>
                     <div className="border-t border-border pt-3 flex items-center justify-between font-bold text-base">
                        <span>Итого к оплате</span>
                        <span className="text-primary">
                           {formatPrice(Number(order.total))}
                        </span>
                     </div>
                  </CardContent>
               </Card>
            </div>
         </div>
      </div>
   );
}
