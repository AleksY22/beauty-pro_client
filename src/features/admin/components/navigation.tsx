'use client';

import { IMenuItem } from '../types/menu.interface';
import {
   Album,
   Aperture,
   BarChart,
   Brush,
   CreditCard,
   FolderKanban,
   Pin,
   Settings2,
   Star,
   Van,
   Wallet,
} from 'lucide-react';

import { ADMIN_URL } from '@/shared/config/url.config';

import { MenuItem } from './menu-item';

export function Navigation() {
   const routes: IMenuItem[] = [
      {
         icon: BarChart,
         link: ADMIN_URL.root(),
         value: 'Статистика',
      },
      {
         icon: Album,
         link: ADMIN_URL.categories(),
         value: 'Категории',
      },
      {
         icon: FolderKanban,
         link: ADMIN_URL.products(),
         value: 'Товары',
      },
      {
         icon: Settings2,
         link: ADMIN_URL.attributes(),
         value: 'Характеристики',
      },
      {
         icon: Aperture,
         link: ADMIN_URL.promotions(),
         value: 'Акции',
      },
      {
         icon: Pin,
         link: ADMIN_URL.advertisements(),
         value: 'Реклама',
      },
      {
         icon: Brush,
         link: ADMIN_URL.colors(),
         value: 'Цвета',
      },
      {
         icon: Star,
         link: ADMIN_URL.reviews(),
         value: 'Отзывы',
      },
      {
         icon: Wallet,
         link: ADMIN_URL.orders(),
         value: 'Заказы',
      },
      {
         icon: Van,
         link: ADMIN_URL.deliveries(),
         value: 'Доставка',
      },
      {
         icon: CreditCard,
         link: ADMIN_URL.payments(),
         value: 'Оплата',
      },
   ];
   return (
      <div className="flex flex-col w-full flex-1 mt-6">
         <div className="flex flex-col w-full space-y-3">
            {routes.map((route) => (
               <MenuItem key={route.value} route={route} />
            ))}
         </div>
      </div>
   );
}
