import { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants';

import { Products } from './products';

export const metadata: Metadata = {
   title: 'Товары',
   ...NO_INDEX_PAGE,
};

export default function ProductsPage() {
   return <Products />;
}
