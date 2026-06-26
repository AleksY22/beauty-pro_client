import { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants';

import { ProductEdit } from './product-edit';

export const metadata: Metadata = {
   title: 'Настройки товара',
   ...NO_INDEX_PAGE,
};

export default function ProductEditPage() {
   return <ProductEdit />;
}
