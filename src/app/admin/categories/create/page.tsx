import { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants';

import { CreateCategory } from './create-category';

export const metadata: Metadata = {
   title: 'Создание категории',
   ...NO_INDEX_PAGE,
};

export default function CreateCategoryPage() {
   return <CreateCategory />;
}
