import { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants';

import { PaymentEdit } from './payment-edit';

export const metadata: Metadata = {
   title: 'Настройки метода оплаты',
   ...NO_INDEX_PAGE,
};

export default function PaymentEditPage() {
   return <PaymentEdit />;
}
