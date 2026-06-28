'use client';

import { CheckCircle2, CreditCard, ShoppingBag, Truck } from 'lucide-react';
import Link from 'next/link';

import Breadcrumbs from '@/shared/components/breadcrumbs';
import {
   Button,
   Card,
   CardContent,
   CardHeader,
   CardTitle,
} from '@/shared/components/ui';
import { Loading } from '@/shared/components/ui/loader-v2';
import { PUBLIC_URL } from '@/shared/config/url.config';
import { useThanksOrder } from '@/shared/hooks/useThanksOrder';

export default function Thanks() {
   const { order, isLoading, error } = useThanksOrder();

   const breadcrumbsData = [
      { text: 'Каталог', href: `${PUBLIC_URL.category()}` },
      { text: 'Спасибо за покупку' },
   ];

   if (isLoading)
      return (
         <div className="flex items-center justify-center p-8 text-center text-gray-500">
            <Loading />
         </div>
      );
   if (error || !order) {
      return (
         <>
            <Breadcrumbs items={breadcrumbsData} />
            <div className="mx-auto max-w-md px-4 py-20 text-center">
               <h1 className="text-2xl font-bold text-neutral-500 mb-2">
                  Заказ не найден
               </h1>
               <p className="text-sm text-neutral-500 mb-6">
                  Не удалось загрузить данные. Возможно, ссылка устарела.
               </p>
               <Button asChild className="bg-neutral-950 text-white w-full">
                  <Link href={PUBLIC_URL.home()}>На главную</Link>
               </Button>
            </div>
         </>
      );
   }

   return (
      <>
         <Breadcrumbs items={breadcrumbsData} />
         <div className="mx-auto max-w-3xl px-4 py-12 md:py-20">
            <div className="flex flex-col items-center text-center mb-8">
               <div className="h-16 w-16 rounded-full flex items-center justify-between p-3.5 mb-4 animate-in zoom-in-50 duration-300">
                  <CheckCircle2 className="h-full w-full" />
               </div>
               <h1 className="text-3xl font-bold tracking-tight text-neutral-600 mb-2">
                  Спасибо за заказ!
               </h1>
               <p className="text-neutral-500 max-w-md text-sm">
                  Номер вашего заказа{' '}
                  <span className="font-semibold text-neutral-500">
                     #{order.id}
                  </span>
                  . Мы отправили подтверждение на ваш Email.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8 justify-center">
               {/* Левая колонка: Детали */}
               <div className="md:col-span-7 space-y-4 mx-auto">
                  <Card className="border-neutral-200 shadow-sm">
                     <CardHeader className="pb-3">
                        <CardTitle className="text-lg font-semibold flex items-center gap-2">
                           <ShoppingBag className="h-4 w-4 text-neutral-500" />{' '}
                           Информация о заказе
                        </CardTitle>
                     </CardHeader>
                     <CardContent className="text-sm space-y-3">
                        <div className="flex justify-between border-b border-neutral-100 pb-2">
                           <span className="text-neutral-500">
                              Статус заказа:
                           </span>
                           <span className="font-medium">Принят</span>
                        </div>
                        <div className="flex justify-between border-b border-neutral-100 pb-2">
                           <span className="text-neutral-500">
                              Способ доставки:
                           </span>
                           <span className="font-medium text-neutral-500 flex items-center gap-1">
                              <Truck className="h-3.5 w-3.5 text-neutral-400" />{' '}
                              {order.deliveryMethod?.name || 'Доставка'}
                           </span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-neutral-500">
                              Способ оплаты:
                           </span>
                           <span className="font-medium text-neutral-500 flex items-center gap-1">
                              <CreditCard className="h-3.5 w-3.5 text-neutral-400" />{' '}
                              {order.paymentMethod?.name || 'Оплата'}
                           </span>
                        </div>
                     </CardContent>
                  </Card>
               </div>
            </div>
            <Button asChild className="w-full">
               <Link href={PUBLIC_URL.home()}>На главную</Link>
            </Button>
         </div>
      </>
   );
}
