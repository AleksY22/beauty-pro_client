/* eslint-disable @typescript-eslint/no-explicit-any */
// import {
//   getAccessToken,
//   removeTokenFromStorage,
// } from '../../features/auth/services/auth-token.service';
// import { authService } from '../../features/auth/services/auth.service';
import { SERVER_URL } from '../config/api.config';
import { PUBLIC_URL } from '../config/url.config';
import axios, { CreateAxiosDefaults } from 'axios';

import { getContentType } from './api.helper';

const isServer = typeof window === 'undefined'; // Проверяем, выполняется ли код на сервере Next.js

const options: CreateAxiosDefaults = {
   // ЕСЛИ НА СЕРВЕРЕ (RSC): шлем полный URL напрямую на NestJS бэкенд, добавляя /api (так как на бэкенде глобальный префикс).
   // ЕСЛИ НА КЛИЕНТЕ (Браузер): шлем относительный /api, чтобы его перехватил middleware.ts
   baseURL: isServer
      ? `${process.env.ALLOWED_ORIGIN}/api` // На сервере Next.js шлем запросы НАПРЯМУЮ на NestJS
      : SERVER_URL, // В браузере шлем относительные запросы на '/api' (для прокси)
   headers: getContentType(),
   withCredentials: true,
};

const axiosClassic = axios.create(options);

const apiClient = axios.create(options);

const handleResponseError = async (error: any) => {
   const backendMessage = error.response?.data?.message;

   // Формируем чистый текст (обрабатываем и массивы валидации, и одиночные строки)
   const message = Array.isArray(backendMessage)
      ? backendMessage.join('. ')
      : backendMessage || error.message || 'Ошибка запроса';

   // Если сессия протухла (401)
   if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
         // КРИТИЧЕСКИ ВАЖНО: делаем редирект ТОЛЬКО если пользователь НЕ на странице входа!
         // Если он уже на /auth/login, мы НЕ перезагружаем страницу, давая тоасту спокойно висеть на экране.
         if (window.location.pathname !== PUBLIC_URL.login()) {
            window.location.href = PUBLIC_URL.login();
         }
      }
   }

   // Обязательно упаковываем наш чистый текст в новый объект Error
   return Promise.reject(new Error(message));
};

// ВЕШАЕМ ИНТЕРЦЕПТОРЫ НА ОБА ИНСТАНСА!
axiosClassic.interceptors.response.use((res) => res.data, handleResponseError);
apiClient.interceptors.response.use((res) => res.data, handleResponseError);

// Интерцептор ОТВЕТА для развертывания data и обработки 401
// apiClient.interceptors.response.use(
//    (response) => response.data, // Сразу возвращаем body (массив корзины и т.д.)
//    async (error) => {
//       const message =
//          error.response?.data?.message || error.message || 'Ошибка запроса';

//       // Если сессия протухла (бэкенд вернул 401)
//       if (error.response?.status === 401) {
//          if (typeof window !== 'undefined') {
//             // Перенаправляем на логин, так как сессия express-session завершена
//             window.location.href = PUBLIC_URL.login();
//          }
//       }

//       return Promise.reject(new Error(message));
//    },
// );

export { axiosClassic, apiClient };
