import { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants';

import { Admin } from './admin';

export const metadata: Metadata = {
   title: 'Управление магазином',
   ...NO_INDEX_PAGE,
};

export default function AdminPage() {
   return <Admin />;
}
