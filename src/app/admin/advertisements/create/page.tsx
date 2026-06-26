import { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants';

import { CreateAdvertisement } from './create-advertisement';

export const metadata: Metadata = {
   title: 'Создание рекламы',
   ...NO_INDEX_PAGE,
};

export default function CreatePromotionPage() {
   return <CreateAdvertisement />;
}
