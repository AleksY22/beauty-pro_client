import {
   IFilterParams,
   IProductVariant,
   IProductVariantInput,
} from '../types/product-variant.interface';

import { axiosClassic } from '@/shared/api/api.interceptors';
import { API_URL } from '@/shared/config/api.config';

interface IVariantResponse {
   variants: IProductVariant[];
   meta: {
      totalCount: number;
      currentPage: number;
      totalPages: number;
      hasMore: boolean;
   };
}

class ProductVariantService {
   // Получение варианта товара по id (нужно для админки)
   async getById(id: string) {
      const { data } = await axiosClassic<IProductVariant>({
         url: API_URL.variants(`by-id/${id}`),
         method: 'GET',
      });
      return data;
   }

   //Получение вариантов по категории========================
   async getByCategory(
      categoryId: string,
      page?: number,
      perPage?: number,
      filters?: IFilterParams,
   ) {
      // Трансформируем объект { "Цвет": ["Красный", "Синий"] } в строку "Цвет:Красный,Синий"
      const serializedAttributes = filters?.attributes
         ? Object.entries(filters.attributes)
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              .filter(([_, values]) => values.length > 0)
              .map(([key, values]) => `${key}:${values.join(',')}`)
              .join(';')
         : undefined;

      const { data } = await axiosClassic<IVariantResponse>({
         url: API_URL.variants(`by-category/${categoryId}`),
         method: 'GET',
         params: {
            page,
            perPage,
            attributes: serializedAttributes,
         },
      });
      return data;
   }

   // Получение всех вариантов конкретного товара (нужно для админки)
   async getByProductId(productId: string, page?: number, perPage?: number) {
      const { data } = await axiosClassic<IVariantResponse>({
         url: API_URL.variants(`product/${productId}`),
         method: 'GET',
         params: { page, perPage },
      });

      return data;
   }

   //Получение самых популярных вариантов====================
   async getMostPopular() {
      const { data } = await axiosClassic<IProductVariant[]>({
         url: API_URL.variants('most-popular'),
         method: 'GET',
      });
      return data;
   }

   //Создание варианта товара================================
   async create(productId: string, data: IProductVariantInput) {
      const { data: createdVariantProduct } =
         await axiosClassic<IProductVariant>({
            url: API_URL.variants(`product/${productId}`),
            method: 'POST',
            data,
         });
      return createdVariantProduct;
   }

   //Обновление товара======================================
   async update(variantId: string, data: IProductVariantInput) {
      const { data: updatedVariantProduct } =
         await axiosClassic<IProductVariant>({
            url: API_URL.variants(`${variantId}`),
            method: 'PUT',
            data,
         });
      return updatedVariantProduct;
   }

   //==================================================
   async delete(variantId: string) {
      const { data: deletedProduct } = await axiosClassic<IProductVariant>({
         url: API_URL.variants(`${variantId}`),
         method: 'DELETE',
      });
      return deletedProduct;
   }
}

export const productVariantService = new ProductVariantService();
