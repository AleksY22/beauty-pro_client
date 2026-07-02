'use client';

import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import Breadcrumbs from '@/shared/components/breadcrumbs';
import { Catalog } from '@/shared/components/catalog/catalog';
import { PUBLIC_URL } from '@/shared/config/url.config';

import { productVariantService } from '@/features/product-variant/services/product-variant.service';
import { IProductVariant } from '@/features/product-variant/types/product-variant.interface';
import { ProductDetails } from '@/features/product/components/product-details';
import { ProductReviews } from '@/features/product/components/product-reviews';

interface ProductProps {
   initialVariant: IProductVariant;
   similarProducts: IProductVariant[];
   id?: string;
}

export function Product({
   initialVariant,
   similarProducts,
   id = '',
}: ProductProps) {
   const { data: variant } = useQuery({
      queryKey: ['variant', id],
      queryFn: () => productVariantService.getById(id),
      initialData: initialVariant,
      enabled: !!id,
   });

   const product = variant?.product;

   const breadcrumbsData = useMemo(
      () => [
         { text: 'Каталог', href: `${PUBLIC_URL.category()}` },
         {
            text: product.category.title,
            href: `${PUBLIC_URL.category(product.category.id)}`,
         },
         { text: `${product.title.slice(0, 20)}...` },
      ],
      [product],
   );

   return (
      <>
         <Breadcrumbs items={breadcrumbsData} />
         <ProductDetails variant={variant} />
         <ProductReviews product={product} />
         <Catalog title="Похожие товары" variants={similarProducts} />
      </>
   );
}
