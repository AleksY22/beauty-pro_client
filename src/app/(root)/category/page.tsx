import { Metadata } from 'next';
import { Suspense } from 'react';

import { CatalogProducts } from './catalog-products';
import { productVariantService } from '@/features/product-variant/services/product-variant.service';

export const metadata: Metadata = {
   title: 'Каталог товаров',
};

async function getVariants() {
   const data = (await productVariantService.getMostPopular()).slice(0, 6);
   return data;
}

export default async function CatalogPage() {
   const data = await getVariants();
   return (
      <Suspense fallback={<div>Загрузка товаров категории...</div>}>
         <CatalogProducts variants={data} />
      </Suspense>
   );
}
