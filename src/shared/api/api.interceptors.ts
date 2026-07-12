/* eslint-disable @typescript-eslint/no-explicit-any */
// import {
//   getAccessToken,
//   removeTokenFromStorage,
// } from '../../features/auth/services/auth-token.service';
// import { authService } from '../../features/auth/services/auth.service';
import { PUBLIC_URL } from '../config/url.config';
import axios, { CreateAxiosDefaults } from 'axios';

import { getContentType } from './api.helper';

const isServer = typeof window === 'undefined';
const isProduction = process.env.NODE_ENV === 'production';

const clientUrl = isProduction ? '/api' : 'http://localhost:3000/api';
const serverUrl =
   process.env.ALLOWED_ORIGIN || 'https://beauty-pro-server.vercel.app';

const options: CreateAxiosDefaults = {
   // Если на сервере (RSC): шлем запрос напрямую на NestJS бэкенд
   // Если на клиенте (Браузер): шлем относительный '/api', чтобы его перехватил middleware.ts
   baseURL: isServer ? `${serverUrl}/api` : clientUrl,
   headers: getContentType(),
   withCredentials: true,
};

const axiosClassic = axios.create(options);

const apiClient = axios.create(options);

const handleResponseError = async (error: any) => {
   const message = error.response?.data?.message;

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
axiosClassic.interceptors.response.use((res) => res, handleResponseError);
apiClient.interceptors.response.use((res) => res, handleResponseError);

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
