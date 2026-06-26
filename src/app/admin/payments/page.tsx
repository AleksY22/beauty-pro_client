import { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants';

import { Payments } from './payments';

export const metadata: Metadata = {
   title: 'Методы оплаты',
   ...NO_INDEX_PAGE,
};

export default function DeliveriesPage() {
   return <Payments />;
}
