/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useQuery } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

import Breadcrumbs from '@/shared/components/breadcrumbs';
import { Catalog } from '@/shared/components/catalog/catalog';
import { PUBLIC_URL } from '@/shared/config/url.config';

import {
   IProductResponse,
   productService,
} from '@/features/product/services/product.service';

interface ExplorerProps {
   products: IProductResponse;
}

export function Explorer({ products: initialData }: ExplorerProps) {
   const router = useRouter();
   const pathname = usePathname();
   const searchParams = useSearchParams();

   const searchTerm = searchParams.get('searchTerm');
   const currentPage = Number(searchParams.get('page')) || 1;
   const perPage = Number(searchParams.get('perPage')) || 10;

   const { data, isLoading } = useQuery({
      queryKey: ['product explorer', searchTerm || '', currentPage, perPage],
      queryFn: () => productService.getAll(searchTerm, currentPage, perPage),
      // Подставляем серверные данные только если это первая страница без поиска
      initialData: !searchTerm && currentPage === 1 ? initialData : undefined,
   });

   // 3. Функция переключения страниц, которая обновляет URL
   const handlePageChange = useCallback(
      (newPage: number) => {
         const params = new URLSearchParams(searchParams.toString());
         params.set('page', newPage.toString());

         // Мягко пушим новый URL без перезагрузки страницы
         router.push(`${pathname}?${params.toString()}`);
      },
      [searchParams, pathname, router],
   );

   const displayedVariants = useMemo(() => {
      const productsList = data?.products ?? [];

      return productsList.flatMap((product: any) => {
         const { variants, ...productWithoutVariants } = product;

         if (!variants || !Array.isArray(variants)) return [];

         // Для каждого варианта создаем объект, добавляя в него родительский продукт
         return variants.map((variant) => ({
            ...variant,
            product: productWithoutVariants,
         }));
      });
   }, [data]);

   const breadcrumbsData = [
      { text: 'Каталог', href: PUBLIC_URL.category() },
      { text: 'Список товаров' },
   ];

   return (
      <div className="w-full">
         <Breadcrumbs items={breadcrumbsData} />
         <Catalog
            title={
               searchTerm
                  ? `Результаты поиска: "${searchTerm}"`
                  : 'Список товаров'
            }
            variants={displayedVariants}
            isLoading={isLoading}
            currentPage={data?.meta?.currentPage ?? currentPage}
            totalPages={data?.meta?.totalPages ?? 1}
            onPageChange={handlePageChange}
         />
      </div>
   );
}
