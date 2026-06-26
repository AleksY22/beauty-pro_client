import { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants';

import { PromotionEdit } from './promotion-edit';

export const metadata: Metadata = {
   title: 'Настройки акции',
   ...NO_INDEX_PAGE,
};

export default function PromotionEditPage() {
   return <PromotionEdit />;
}
