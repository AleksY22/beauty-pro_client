import { IDelivery, IDeliveryInput } from '../types/delivery.interface';

import { axiosClassic } from '@/shared/api/api.interceptors';
import { API_URL } from '@/shared/config/api.config';

interface IDeliveryResponse {
   deliveries: IDelivery[];
   meta: {
      totalCount: number;
      currentPage: number;
      totalPages: number;
      hasMore: boolean;
   };
}

class DeliveryService {
   //=======================================
   async getAvailable() {
      const { data } = await axiosClassic<IDelivery[]>({
         url: API_URL.deliveries('available'),
         method: 'GET',
      });
      return data;
   }

   //=======================================
   async getAll(page?: number, perPage?: number) {
      const { data } = await axiosClassic<IDeliveryResponse>({
         url: API_URL.deliveries(),
         method: 'GET',
         params: { page, perPage },
      });
      return data;
   }

   //=======================================
   async getById(deliveryId: string) {
      const { data } = await axiosClassic<IDelivery>({
         url: API_URL.deliveries(`by-id/${deliveryId}`),
         method: 'GET',
      });

      return data;
   }

   //=======================================
   async create(data: IDeliveryInput) {
      const { data: createDelivery } = await axiosClassic<IDelivery>({
         url: API_URL.deliveries(),
         method: 'POST',
         data,
      });
      return createDelivery;
   }

   //=======================================
   async update(deliveryId: string, data: IDeliveryInput) {
      const { data: updateddelivery } = await axiosClassic<IDelivery>({
         url: API_URL.deliveries(`${deliveryId}`),
         method: 'PUT',
         data,
      });
      return updateddelivery;
   }

   //=======================================
   async delete(deliveryId: string) {
      const { data: deleteDelivery } = await axiosClassic<IDelivery>({
         url: API_URL.deliveries(`${deliveryId}`),
         method: 'DELETE',
      });
      return deleteDelivery;
   }
}

export const deliveryService = new DeliveryService();
