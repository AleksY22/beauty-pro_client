import { IProduct, IProductInput } from '../types/product.interface';

import { axiosClassic } from '@/shared/api/api.interceptors';
import { API_URL } from '@/shared/config/api.config';

import { IProductVariant } from '@/features/product-variant/types/product-variant.interface';

export interface IProductResponse {
   products: IProduct[];
   meta: {
      totalCount: number;
      currentPage: number;
      totalPages: number;
      hasMore: boolean;
   };
}

class ProductService {
   //Получение всех товаров================================
   async getAll(searchTerm?: string | null, page?: number, perPage?: number) {
      const { data } = await axiosClassic<IProductResponse>({
         url: API_URL.products(),
         method: 'GET',
         // headers: {
         //    'Cache-Control': 'no-cache, no-store, must-revalidate',
         //    Pragma: 'no-cache',
         //    Expires: '0',
         // },
         params: {
            searchTerm: searchTerm || undefined,
            page,
            perPage,
         },
      });

      return data || null;
   }

   //Получение товара по id===============================
   async getById(productId: string) {
      const { data } = await axiosClassic<IProduct>({
         url: API_URL.products(`by-id/${productId}`),
         method: 'GET',
      });
      return data;
   }

   //Получение товаров по категории========================
   async getByCategory(categoryId: string) {
      const { data } = await axiosClassic<IProduct[]>({
         url: API_URL.products(`by-category/${categoryId}`),
         method: 'GET',
      });
      return data;
   }

   //Получение самых популярных товаров====================
   async getMostPopular() {
      const { data } = await axiosClassic<IProduct[]>({
         url: API_URL.products('most-popular'),
         method: 'GET',
      });
      return data;
   }

   //Получение похожих товаров=============================
   async getSimilar(similarId: string) {
      const { data } = await axiosClassic<IProductVariant[]>({
         url: API_URL.products(`similar/${similarId}`),
         method: 'GET',
      });
      return data;
   }

   //Создание товара========================================
   async create(data: IProductInput) {
      const { data: createdProduct } = await axiosClassic<IProduct>({
         url: API_URL.products(),
         method: 'POST',
         data,
      });
      return createdProduct;
   }

   //Обновление товара======================================
   async update(productId: string, data: IProductInput) {
      const { data: updatedProduct } = await axiosClassic<IProduct>({
         url: API_URL.products(`${productId}`),
         method: 'PUT',
         data,
      });
      return updatedProduct;
   }

   //==================================================
   async delete(productId: string) {
      const { data: deletedProduct } = await axiosClassic<IProduct>({
         url: API_URL.products(`${productId}`),
         method: 'DELETE',
      });
      return deletedProduct;
   }
}

export const productService = new ProductService();
