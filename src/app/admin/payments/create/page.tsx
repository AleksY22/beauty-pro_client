import { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants';

import { CreatePayment } from './create-payment';

export const metadata: Metadata = {
   title: 'Создание метода оплаты',
   ...NO_INDEX_PAGE,
};

export default function CreatePaymentPage() {
   return <CreatePayment />;
}
