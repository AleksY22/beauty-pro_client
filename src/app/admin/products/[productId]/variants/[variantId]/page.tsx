import { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants';

import { EditVariant } from './variant-edit';

export const metadata: Metadata = {
   title: 'Настройки вариации',
   ...NO_INDEX_PAGE,
};

export default function VariantEditPage() {
   return <EditVariant />;
}
