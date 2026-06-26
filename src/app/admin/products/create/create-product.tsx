'use client';

import { Loader2 } from 'lucide-react';

import { useGetCategories } from '@/features/category/hooks/useGetCategories';
import { ProductForm } from '@/features/product/components/product-form';

export function CreateProduct() {
   const { categories, isLoading } = useGetCategories();

   if (isLoading) {
      return (
         <div className="flex h-50 items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
         </div>
      );
   }

   return <ProductForm categories={categories || []} />;
}
