import { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants';

import { Deliveries } from './deliveries';

export const metadata: Metadata = {
   title: 'Методы доставки',
   ...NO_INDEX_PAGE,
};

export default function DeliveriesPage() {
   return <Deliveries />;
}
