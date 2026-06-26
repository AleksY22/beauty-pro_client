'use client';

import { useGetAttributes } from '@/features/attribute/hooks/useGetAttributes';
import { useGetColors } from '@/features/color/hooks/useGetColors';
import { VariantForm } from '@/features/product-variant/components/variant-form';

export function CreateVariant() {
   const { colors } = useGetColors();
   const { attributes } = useGetAttributes();

   return <VariantForm colors={colors || []} attributes={attributes || []} />;
}
