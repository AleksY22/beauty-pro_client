import { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants';

export const metadata: Metadata = {
   title: 'Распродажа',
   ...NO_INDEX_PAGE,
};

export default function CatalogSales() {
   return <div>Страница находится в разработке</div>;
}
