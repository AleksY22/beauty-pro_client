import { Metadata } from 'next';

import { Products } from './products';

export const metadata: Metadata = {
   title: 'Каталог товаров',
};

export default function CatalogPage() {
   return <Products />;
}
