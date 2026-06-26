import { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants';

import { Cart } from './cart';

export const metadata: Metadata = {
   title: 'Корзина',
   ...NO_INDEX_PAGE,
};

export default function CartPage() {
   return <Cart />;
}
