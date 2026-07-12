import { Metadata } from 'next';

import { DevPage } from '@/shared/components/dev-page';
import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants';

export const metadata: Metadata = {
   title: 'Как сделать возврат',
   ...NO_INDEX_PAGE,
};

export default function HelpReturns() {
   return <DevPage />;
}
