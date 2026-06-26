import { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants';

import { Categories } from './categories';

export const metadata: Metadata = {
   title: 'Категории',
   ...NO_INDEX_PAGE,
};

export default function CategoriesPage() {
   return <Categories />;
}
