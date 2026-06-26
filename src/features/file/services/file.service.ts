import { IFile } from '../types/file.interface';

import { axiosClassic } from '@/shared/api/api.interceptors';
import { API_URL } from '@/shared/config/api.config';

class FileService {
   // private baseUrl = process.env.SERVER_URL;

   //===========================Загрузка файлов на бэкенд
   async uploadFiles(file: FormData, folder?: string) {
      try {
         const { data } = await axiosClassic<IFile[]>({
            url: API_URL.files('upload'),
            method: 'POST',
            data: file,
            params: { folder },
            headers: {
               'Content-Type': 'multipart/form-data',
            },
         });

         return data;
      } catch (error) {
         console.error('Upload error:', error);
         throw error;
      }
   }

   // //============================Удаление файлов через бэкенд
   async deleteFiles(urls: string | string[]) {
      try {
         // Приводим к массиву строк для бэкенд-DTO, который ждет именно массив
         const urlsArray = Array.isArray(urls) ? urls : urls ? [urls] : [];

         const { data } = await axiosClassic<{ success: boolean }>({
            url: API_URL.files('delete'),
            method: 'POST',
            data: { urls: urlsArray },
         });

         return data;
      } catch (error) {
         console.error('Delete error:', error);
         throw error;
      }
   }
}

export const fileService = new FileService();
