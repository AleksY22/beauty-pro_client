import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';

import { Product } from './product';
import { productVariantService } from '@/features/product-variant/services/product-variant.service';
import { productService } from '@/features/product/services/product.service';

interface ProductPageProps {
   params: Promise<{ variantId: string }>;
}

const getProducts = cache(async (variantId: string) => {
   try {
      const variant = await productVariantService.getById(variantId);

      const product = await productService.getById(variant.product.id);

      const similarProducts = await productService.getSimilar(variantId);
      return { variant, product, similarProducts };
   } catch (error) {
      console.error('Ошибка загрузки данных:', error);
      return null;
   }
});

//функция генерации метадынных
export async function generateMetadata({
   params,
}: {
   params: Promise<{ variantId: string }>;
}): Promise<Metadata> {
   const { variantId } = await params;
   const data = await getProducts(variantId);
   if (!data) return { title: 'Товар не найден' };
   return {
      title: data.product.title,
      openGraph: {
         images: [
            {
               url: data.product.images[0],
               width: 1000,
               height: 1000,
               alt: data.product.title,
            },
         ],
      },
   };
}

export default async function ProductPage({ params }: ProductPageProps) {
   const { variantId } = await params;

   const data = await getProducts(variantId);

   if (!data) return notFound();

   return (
      <Product
         initialVariant={data.variant}
         similarProducts={data.similarProducts}
         id={variantId}
      />
   );
}
