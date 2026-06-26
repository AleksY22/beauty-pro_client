import { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants';

import { Colors } from './colors';

export const metadata: Metadata = {
   title: 'Цвета',
   ...NO_INDEX_PAGE,
};

export default function ColorsPage() {
   return <Colors />;
}
