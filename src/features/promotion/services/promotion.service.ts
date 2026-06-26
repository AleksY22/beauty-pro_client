import { IPromotion, IPromotionInput } from '../types/promotion.interface';

import { axiosClassic } from '@/shared/api/api.interceptors';
import { API_URL } from '@/shared/config/api.config';

interface IPromotionResponse {
   promotions: IPromotion[];
   meta: {
      totalCount: number;
      currentPage: number;
      totalPages: number;
      hasMore: boolean;
   };
}

class PromotionService {
   //===============================================
   async getAll(page?: number, perPage?: number) {
      const { data } = await axiosClassic<IPromotionResponse>({
         url: API_URL.promotions(),
         method: 'GET',
         params: { page, perPage },
      });
      return data;
   }

   //===============================================
   async getById(promotionId: string) {
      const { data } = await axiosClassic<IPromotion>({
         url: API_URL.promotions(`by-id/${promotionId}`),
         method: 'GET',
      });
      return data;
   }

   //===============================================
   async create(data: IPromotionInput) {
      const { data: createdPromotion } = await axiosClassic({
         url: API_URL.promotions(),
         method: 'POST',
         data,
      });
      return createdPromotion;
   }

   //===============================================
   async update(promotionId: string, data: IPromotionInput) {
      const { data: updatedPromotion } = await axiosClassic({
         url: API_URL.promotions(`${promotionId}`),
         method: 'PUT',
         data,
      });
      return updatedPromotion;
   }

   //===============================================
   async delete(promotionId: string) {
      const { data: deletedPromotion } = await axiosClassic({
         url: API_URL.promotions(`${promotionId}`),
         method: 'DELETE',
      });
      return deletedPromotion;
   }
}

export const promotionService = new PromotionService();
