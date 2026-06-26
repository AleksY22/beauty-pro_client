import Breadcrumbs from '@/shared/components/breadcrumbs';
import { Catalog } from '@/shared/components/catalog/catalog';
import {
   Advantage,
   PopularCategories,
} from '@/shared/components/main-layout/home';

import { IProductVariant } from '@/features/product-variant/types/product-variant.interface';

interface CatalogProductsProps {
   variants: IProductVariant[];
}

export function CatalogProducts({ variants }: CatalogProductsProps) {
   const breadcrumbsData = [{ text: 'Каталог' }];
   return (
      <>
         <Breadcrumbs items={breadcrumbsData} />
         <PopularCategories title="Каталог товаров" />
         <Catalog title="Популярные товары" variants={variants} />
         <Advantage />
      </>
   );
}
