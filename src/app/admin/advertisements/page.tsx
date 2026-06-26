import { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants';

import { Advertisements } from './advertisements';

export const metadata: Metadata = {
   title: 'Реклама',
   ...NO_INDEX_PAGE,
};

export default function PromotionsPage() {
   return <Advertisements />;
}
