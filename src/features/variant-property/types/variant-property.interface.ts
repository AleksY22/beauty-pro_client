import { IAttribute } from '@/features/attribute/types/attribute.interface';

export interface IVariantProperty {
   id: string;
   value: string;
   variantId: string;
   attributeId: string;
   attribute: IAttribute;
}

export interface IVariantPropertyInput extends Omit<
   IVariantProperty,
   'id' | 'attribute'
> {
   variantId: string;
   attributeId: string;
   value: string;
}
