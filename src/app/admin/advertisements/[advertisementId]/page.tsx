import { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants';

import { AdvertisementEdit } from './advertisement-edit';

export const metadata: Metadata = {
   title: 'Настройки рекламы',
   ...NO_INDEX_PAGE,
};

export default function AdvertisementEditPage() {
   return <AdvertisementEdit />;
}
