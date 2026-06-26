import { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants';

import Thanks from './thanks';

export const metadata: Metadata = {
   title: 'Спасибо за покупку',
   ...NO_INDEX_PAGE,
};

export default function ThanksPage() {
   return <Thanks />;
}
