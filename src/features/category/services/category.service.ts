import { ICategory, ICategoryInput } from '../types/category.interface';

import { axiosClassic } from '@/shared/api/api.interceptors';
import { API_URL } from '@/shared/config/api.config';

interface ICategoryResponse {
   categories: ICategory[];
   meta: {
      totalCount: number;
      currentPage: number;
      totalPages: number;
      hasMore: boolean;
   };
}

class CategoryService {
   //===============================================
   async getAll(page?: number, perPage?: number) {
      const { data } = await axiosClassic<ICategoryResponse>({
         url: API_URL.categories(),
         method: 'GET',
         params: { page, perPage },
      });
      return data;
   }

   //===============================================
   async getById(categoryId: string) {
      const { data } = await axiosClassic<ICategory>({
         url: API_URL.categories(`by-id/${categoryId}`),
         method: 'GET',
      });
      return data;
   }

   //===============================================
   async create(data: ICategoryInput) {
      const { data: createdCategory } = await axiosClassic({
         url: API_URL.categories(),
         method: 'POST',
         data,
      });
      return createdCategory;
   }

   //===============================================
   async update(categoryId: string, data: ICategoryInput) {
      const { data: updatedCategory } = await axiosClassic({
         url: API_URL.categories(`${categoryId}`),
         method: 'PUT',
         data,
      });
      return updatedCategory;
   }

   //===============================================
   async delete(categoryId: string) {
      const { data: deletedCategory } = await axiosClassic({
         url: API_URL.categories(`${categoryId}`),
         method: 'DELETE',
      });
      return deletedCategory;
   }
}

export const categoryService = new CategoryService();
