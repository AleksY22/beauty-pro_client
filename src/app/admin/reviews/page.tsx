import { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants';

import { Reviews } from './reviews';

export const metadata: Metadata = {
   title: 'Отзывы',
   ...NO_INDEX_PAGE,
};

export default function ReviewsPage() {
   return <Reviews />;
}
