import { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants';

import { Attributes } from './attributes';

export const metadata: Metadata = {
   title: 'Характеристики',
   ...NO_INDEX_PAGE,
};

export default function AttributesPage() {
   return <Attributes />;
}
