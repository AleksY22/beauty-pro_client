import { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants';

import { Orders } from './orders';

export const metadata: Metadata = {
   title: 'Заказы',
   ...NO_INDEX_PAGE,
};

export default function ColorsPage() {
   return <Orders />;
}
