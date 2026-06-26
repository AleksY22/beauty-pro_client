import { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants';

import { OrderInfo } from './order-info';

export const metadata: Metadata = {
   title: 'Заказ',
   ...NO_INDEX_PAGE,
};

export default function OrderInfoPage() {
   return <OrderInfo />;
}
