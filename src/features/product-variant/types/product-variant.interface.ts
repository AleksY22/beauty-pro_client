import { IColor } from '@/features/color/types/color.interface';
import { IProduct } from '@/features/product/types/product.interface';
import { IVariantProperty } from '@/features/variant-property/types/variant-property.interface';

export interface IProductVariant {
   id: string;
   createdAt: string;
   price: string;
   sku: string;
   stock: number;
   discount: number;
   product: IProduct;
   colorId: string | null;
   color?: IColor | null;
   properties: IVariantProperty[];
}

export interface IProductVariantInput extends Omit<
   IProductVariant,
   'id' | 'color' | 'properties' | 'createdAt'
> {
   colorId: string | null;
   properties: {
      attributeId: string;
      value: string;
   }[];
}

export interface IFilterParams {
   attributes?: Record<string, string[]>;
}
