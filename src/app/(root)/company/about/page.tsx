import { Metadata } from 'next';

import { DevPage } from '@/shared/components/dev-page';
import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants';

export const metadata: Metadata = {
   title: 'О нас',
   ...NO_INDEX_PAGE,
};

export default function CompanyAbout() {
   return <DevPage />;
}
