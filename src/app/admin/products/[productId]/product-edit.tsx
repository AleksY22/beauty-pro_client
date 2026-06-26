'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { DataTableLoading } from '@/shared/components/data-table';

import { useGetCategories } from '@/features/category/hooks/useGetCategories';
import { ProductForm } from '@/features/product/components/product-form';
import { productService } from '@/features/product/services/product.service';

export function ProductEdit() {
   const params = useParams<{ productId: string }>();
   const { categories, isLoading } = useGetCategories();

   const { data } = useQuery({
      queryKey: ['get product', params.productId],
      queryFn: () => productService.getById(params.productId),
   });

   if (isLoading) {
      return (
         <div className="p-6">
            <DataTableLoading />
         </div>
      );
   }

   return <ProductForm categories={categories || []} product={data} />;
}
