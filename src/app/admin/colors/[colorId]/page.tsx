import { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants';

import { ColorEdit } from './color-edit';

export const metadata: Metadata = {
   title: 'Настройки цвета',
   ...NO_INDEX_PAGE,
};

export default function ColorEditPage() {
   return <ColorEdit />;
}
