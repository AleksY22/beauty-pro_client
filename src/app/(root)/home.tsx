import { Catalog } from '@/shared/components/catalog/catalog';
import { PopularCategories } from '@/shared/components/main-layout/home';
import { PrimarySlider } from '@/shared/components/main-layout/home';
import { Promotions } from '@/shared/components/main-layout/home';
import { Advantage } from '@/shared/components/main-layout/home';
import { Advertisement } from '@/shared/components/main-layout/home';

import { IProductVariant } from '@/features/product-variant/types/product-variant.interface';

interface HomeProps {
   variants: IProductVariant[];
}

export function Home({ variants }: HomeProps) {
   const hasVariants = variants && variants.length > 0;
   return (
      <>
         <PrimarySlider />
         <PopularCategories title="Популярные категории" />
         <Promotions />
         {hasVariants && (
            <Catalog title="Популярные товары" variants={variants} />
         )}
         <Advertisement />
         <Advantage />
      </>
   );
}
