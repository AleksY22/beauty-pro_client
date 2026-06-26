'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { DataTableLoading } from '@/shared/components/data-table';

import { useGetAttributes } from '@/features/attribute/hooks/useGetAttributes';
import { useGetColors } from '@/features/color/hooks/useGetColors';
import { VariantForm } from '@/features/product-variant/components/variant-form';
import { productVariantService } from '@/features/product-variant/services/product-variant.service';

export function EditVariant() {
   const params = useParams<{ variantId: string }>();

   const { colors, isLoading: isColorsLoading } = useGetColors();
   const { attributes, isLoading: isAttributesLoading } = useGetAttributes();

   const { data } = useQuery({
      queryKey: ['get variant', params.variantId],
      queryFn: () => productVariantService.getById(params.variantId!),
      enabled: !!params.variantId,
   });

   const isDataLoading =
      !params.variantId || isColorsLoading || isAttributesLoading;

   if (isDataLoading) {
      return (
         <div className="p-6">
            <DataTableLoading />
         </div>
      );
   }

   return (
      <VariantForm
         colors={colors || []}
         attributes={attributes || []}
         variant={data}
      />
   );
}
