import { IColor, IColorInput } from '../types/color.interface';

import { axiosClassic } from '@/shared/api/api.interceptors';
import { API_URL } from '@/shared/config/api.config';

interface IColorResponse {
   colors: IColor[];
   meta: {
      totalCount: number;
      currentPage: number;
      totalPages: number;
      hasMore: boolean;
   };
}

class ColorService {
   //=======================================
   async getAll(page?: number, perPage?: number) {
      const { data } = await axiosClassic<IColorResponse>({
         url: API_URL.colors(),
         method: 'GET',
         params: { page, perPage },
      });
      return data;
   }

   //=======================================
   async getById(colorId: string) {
      const { data } = await axiosClassic<IColor>({
         url: API_URL.colors(`by-id/${colorId}`),
         method: 'GET',
      });

      return data;
   }

   //=======================================
   async create(data: IColorInput) {
      const { data: createdColor } = await axiosClassic<IColor>({
         url: API_URL.colors(),
         method: 'POST',
         data,
      });
      return createdColor;
   }

   //=======================================
   async update(colorId: string, data: IColorInput) {
      const { data: updatedColor } = await axiosClassic<IColor>({
         url: API_URL.colors(`${colorId}`),
         method: 'PUT',
         data,
      });
      return updatedColor;
   }

   //=======================================
   async delete(colorId: string) {
      const { data: deleteColor } = await axiosClassic<IColor>({
         url: API_URL.colors(`${colorId}`),
         method: 'DELETE',
      });
      return deleteColor;
   }
}

export const colorService = new ColorService();
