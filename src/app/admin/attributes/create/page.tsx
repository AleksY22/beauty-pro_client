import { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants';

import { CreateAttribute } from './create-attribute';

export const metadata: Metadata = {
   title: 'Создание характеристики',
   ...NO_INDEX_PAGE,
};

export default function CreateAttributePage() {
   return <CreateAttribute />;
}
