import { IReview, IReviewInput } from '../types/review.interface';

import { axiosClassic } from '@/shared/api/api.interceptors';
import { API_URL } from '@/shared/config/api.config';

interface IReviewResponse {
   reviews: IReview[];
   meta: {
      totalCount: number;
      currentPage: number;
      totalPages: number;
      hasMore: boolean;
   };
}

class ReviewService {
   //==========================================
   async getAll(page: number = 1, perPage: number = 10) {
      const { data } = await axiosClassic<IReviewResponse>({
         url: API_URL.reviews('all'),
         method: 'GET',
         params: { page, perPage },
      });
      return data;
   }

   //==========================================
   async getByProduct(variantId: string) {
      const { data } = await axiosClassic<IReview[]>({
         url: API_URL.reviews(`by-product/${variantId}`),
         method: 'GET',
      });
      return data;
   }

   //==========================================
   async create(variantId: string, data: IReviewInput) {
      const { data: createdReview } = await axiosClassic<IReview>({
         url: API_URL.reviews(`${variantId}`),
         method: 'POST',
         data,
      });
      return createdReview;
   }

   //==========================================
   async update(reviewId: string, data: IReviewInput) {
      const { data: createdReview } = await axiosClassic<IReview>({
         url: API_URL.reviews(`${reviewId}`),
         method: 'PUT',
         data,
      });
      return createdReview;
   }

   //============================================
   async delete(reviewId: string) {
      const { data: deletedReview } = await axiosClassic<IReview>({
         url: API_URL.reviews(`${reviewId}`),
         method: 'DELETE',
      });
      return deletedReview;
   }
}

export const reviewService = new ReviewService();
