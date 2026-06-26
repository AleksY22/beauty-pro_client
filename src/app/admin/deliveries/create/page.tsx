import { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants';

import { CreateDelivery } from './create-delivery';

export const metadata: Metadata = {
   title: 'Создание метода доставки',
   ...NO_INDEX_PAGE,
};

export default function CreateDeliveryPage() {
   return <CreateDelivery />;
}
