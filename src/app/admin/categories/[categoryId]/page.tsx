import { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants';

import { CategoryEdit } from './category-edit';

export const metadata: Metadata = {
   title: 'Настройки категории',
   ...NO_INDEX_PAGE,
};

export default function CategoryEditPage() {
   return <CategoryEdit />;
}
