import { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants';

import { CreateColor } from './create-color';

export const metadata: Metadata = {
   title: 'Создание цвета',
   ...NO_INDEX_PAGE,
};

export default function CreateColorPage() {
   return <CreateColor />;
}
