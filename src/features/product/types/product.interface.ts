import { ICategory } from '@/features/category/types/category.interface';
import { IProductVariant } from '@/features/product-variant/types/product-variant.interface';
import { IReview } from '@/features/review/types/review.interface';

export interface IProduct {
   id: string;
   createdAt: string;
   title: string;
   description: string;
   images: string[];
   category: ICategory;
   reviews: IReview[];
   variants: IProductVariant[];
}

export interface IProductInput extends Omit<
   IProduct,
   'id' | 'reviews' | 'category' | 'variants' | 'createdAt'
> {
   categoryId: string;
}
