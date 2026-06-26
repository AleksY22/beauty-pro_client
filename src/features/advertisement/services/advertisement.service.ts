import {
   IAdvertisement,
   IAdvertisementInput,
} from '../types/advertisement.interface';

import { axiosClassic } from '@/shared/api/api.interceptors';
import { API_URL } from '@/shared/config/api.config';

interface IAdvertisementResponse {
   advertisements: IAdvertisement[];
   meta: {
      totalCount: number;
      currentPage: number;
      totalPages: number;
      hasMore: boolean;
   };
}

class AdvertisementService {
   //===============================================
   async getAll(page?: number, perPage?: number) {
      const { data } = await axiosClassic<IAdvertisementResponse>({
         url: API_URL.advertisements(),
         method: 'GET',
         params: { page, perPage },
      });
      return data;
   }

   //===============================================
   async getById(advertisementId: string) {
      const { data } = await axiosClassic<IAdvertisement>({
         url: API_URL.advertisements(`by-id/${advertisementId}`),
         method: 'GET',
      });
      return data;
   }

   //===============================================
   async create(data: IAdvertisementInput) {
      const { data: createdAdvertisement } = await axiosClassic({
         url: API_URL.advertisements(),
         method: 'POST',
         data,
      });
      return createdAdvertisement;
   }

   //===============================================
   async update(advertisementId: string, data: IAdvertisementInput) {
      const { data: updatedAdvertisement } = await axiosClassic({
         url: API_URL.advertisements(`${advertisementId}`),
         method: 'PUT',
         data,
      });
      return updatedAdvertisement;
   }

   //===============================================
   async delete(advertisementId: string) {
      const { data: deletedAdvertisement } = await axiosClassic({
         url: API_URL.advertisements(`${advertisementId}`),
         method: 'DELETE',
      });
      return deletedAdvertisement;
   }
}

export const advertisementService = new AdvertisementService();
