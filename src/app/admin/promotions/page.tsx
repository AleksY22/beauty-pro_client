import { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants';

import { Promotions } from './promotions';

export const metadata: Metadata = {
   title: 'Акции',
   ...NO_INDEX_PAGE,
};

export default function PromotionsPage() {
   return <Promotions />;
}
