import { Metadata } from 'next';

import { CatalogProducts } from './catalog-products';
import { productVariantService } from '@/features/product-variant/services/product-variant.service';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
   title: 'Каталог товаров',
};

async function getVariants() {
   const data = (await productVariantService.getMostPopular()).slice(0, 6);
   return data;
}

export default async function CatalogPage() {
   const data = await getVariants();
   return <CatalogProducts variants={data} />;
}
