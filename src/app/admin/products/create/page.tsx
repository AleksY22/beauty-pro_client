import { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants';

import { CreateProduct } from './create-product';

export const metadata: Metadata = {
   title: 'Создание товара',
   ...NO_INDEX_PAGE,
};

export default function CreateProductPage() {
   return <CreateProduct />;
}
