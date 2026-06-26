import { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants';

import { DeliveryEdit } from './delivery-edit';

export const metadata: Metadata = {
   title: 'Настройки метода доставки',
   ...NO_INDEX_PAGE,
};

export default function DeliveryEditPage() {
   return <DeliveryEdit />;
}
