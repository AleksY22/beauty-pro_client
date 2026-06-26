'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import Breadcrumbs from '@/shared/components/breadcrumbs';
import { CatalogWithFilter } from '@/shared/components/catalog/catalog-filter';
import { PUBLIC_URL } from '@/shared/config/url.config';

import { categoryService } from '@/features/category/services/category.service';
import { ICategory } from '@/features/category/types/category.interface';
import { useGetVariantsByCategory } from '@/features/product-variant/hooks/useGetVariantsByCategory';

interface ICategoryWithFilters extends ICategory {
   availableAttributes?: {
      name: string;
      values: string[];
   }[];
}

export function Products() {
   const params = useParams<{ categoryId: string }>();
   const {
      variants: variantsData,
      isLoading: isVariantsLoading,
      page,
      setPage,
      meta,
      filters,
      updateFilters,
   } = useGetVariantsByCategory();

   const { data: categoryData, isLoading: isCategoryLoading } =
      useQuery<ICategoryWithFilters>({
         queryKey: ['get category', params.categoryId],
         queryFn: () => categoryService.getById(params.categoryId!),
         enabled: !!params.categoryId,
      });

   const categoryTitle =
      categoryData?.title ||
      (isCategoryLoading ? 'Загрузка категории...' : 'Каталог');

   const breadcrumbsData = [
      { text: 'Каталог', href: PUBLIC_URL.category() },
      { text: categoryTitle },
   ];

   return (
      <div className="w-full">
         <Breadcrumbs items={breadcrumbsData} />
         <CatalogWithFilter
            title={categoryTitle}
            variants={variantsData}
            isLoading={isVariantsLoading}
            currentPage={page}
            totalPages={meta.totalPages}
            onPageChange={setPage}
            activeFilters={filters}
            onFilterChange={updateFilters}
            availableAttributes={categoryData?.availableAttributes || []}
         />
      </div>
   );
}
