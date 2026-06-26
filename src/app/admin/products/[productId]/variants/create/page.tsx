import { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants';

import { CreateVariant } from './create-variant';

export const metadata: Metadata = {
   title: 'Создание вариации',
   ...NO_INDEX_PAGE,
};

export default function CreateProductPage() {
   return <CreateVariant />;
}
