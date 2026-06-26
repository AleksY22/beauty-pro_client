import { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants';

import { CreatePromotion } from './create-promotion';

export const metadata: Metadata = {
   title: 'Создание акции',
   ...NO_INDEX_PAGE,
};

export default function CreatePromotionPage() {
   return <CreatePromotion />;
}
