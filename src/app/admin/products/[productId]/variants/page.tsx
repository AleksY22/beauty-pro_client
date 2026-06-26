import { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants';

import { Variants } from './variants';

export const metadata: Metadata = {
   title: 'Вариации',
   ...NO_INDEX_PAGE,
};

export default function ProductsPage() {
   return <Variants />;
}
