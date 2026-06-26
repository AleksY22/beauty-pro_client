import { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants';

import { Order } from './order';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
   title: 'Оформление заказа',
   ...NO_INDEX_PAGE,
};

export default function OrderPage() {
   return <Order />;
}
