import { IAttribute, IAttributeInput } from '../types/attribute.interface';

import { axiosClassic } from '@/shared/api/api.interceptors';
import { API_URL } from '@/shared/config/api.config';

interface IAttributeResponse {
   attributes: IAttribute[];
   meta: {
      totalCount: number;
      currentPage: number;
      totalPages: number;
      hasMore: boolean;
   };
}

class AttributeService {
   //===============================================
   async getAll(page?: number, perPage?: number) {
      const { data } = await axiosClassic<IAttributeResponse>({
         url: API_URL.attributes(),
         method: 'GET',
         params: { page, perPage },
      });
      return data;
   }

   //===============================================
   async getById(attributeId: string) {
      const { data } = await axiosClassic<IAttribute>({
         url: API_URL.attributes(`by-id/${attributeId}`),
         method: 'GET',
      });
      return data;
   }

   //===============================================
   async create(data: IAttributeInput) {
      const { data: createdAttribute } = await axiosClassic({
         url: API_URL.attributes(),
         method: 'POST',
         data,
      });
      return createdAttribute;
   }

   //===============================================
   async update(attributeId: string, data: IAttributeInput) {
      const { data: updatedAttribute } = await axiosClassic({
         url: API_URL.attributes(`${attributeId}`),
         method: 'PUT',
         data,
      });
      return updatedAttribute;
   }

   //===============================================
   async delete(attributeId: string) {
      const { data: deletedAttribute } = await axiosClassic({
         url: API_URL.attributes(`${attributeId}`),
         method: 'DELETE',
      });
      return deletedAttribute;
   }
}

export const attributeService = new AttributeService();
