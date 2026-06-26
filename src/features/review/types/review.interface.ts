import { IProduct } from '@/features/product/types/product.interface';
import { IUser } from '@/features/user/types/user.interface';

export interface IReview {
   id: string;
   createdAt: string;
   text: string;
   rating: number;
   user: IUser;
   product: IProduct;
}

export type IReviewInput = Pick<IReview, 'text' | 'rating'>;
