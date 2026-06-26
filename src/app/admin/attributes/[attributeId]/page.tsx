import { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants';

import { AttributeEdit } from './attribute-edit';

export const metadata: Metadata = {
   title: 'Настройки характеристик',
   ...NO_INDEX_PAGE,
};

export default function AttributeEditPage() {
   return <AttributeEdit />;
}
