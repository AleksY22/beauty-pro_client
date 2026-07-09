// import {
//   getAccessToken,
//   removeTokenFromStorage,
// } from '../../features/auth/services/auth-token.service';
// import { authService } from '../../features/auth/services/auth.service';
import { SERVER_URL } from '../config/api.config';
import { PUBLIC_URL } from '../config/url.config';
import axios, { CreateAxiosDefaults } from 'axios';

import { getContentType } from './api.helper';

const isProduction = process.env.NODE_ENV === 'production';
const isServer = typeof window === 'undefined'; // Проверяем, выполняется ли код на сервере Next.js

const options: CreateAxiosDefaults = {
   // ЕСЛИ НА СЕРВЕРЕ (RSC): шлем полный URL напрямую на NestJS бэкенд, добавляя /api (так как на бэкенде глобальный префикс).
   // ЕСЛИ НА КЛИЕНТЕ (Браузер): шлем относительный /api, чтобы его перехватил middleware.ts
   baseURL: isServer
      ? `${process.env.SERVER_URL}/api`
      : isProduction
        ? '/api'
        : SERVER_URL,
   headers: getContentType(),
   withCredentials: true,
};

const axiosClassic = axios.create(options);

const apiClient = axios.create(options);

// Интерцептор ОТВЕТА для развертывания data и обработки 401
apiClient.interceptors.response.use(
   (response) => response.data, // Сразу возвращаем body (массив корзины и т.д.)
   async (error) => {
      const message =
         error.response?.data?.message || error.message || 'Ошибка запроса';

      // Если сессия протухла (бэкенд вернул 401)
      if (error.response?.status === 401) {
         if (typeof window !== 'undefined') {
            // Перенаправляем на логин, так как сессия express-session завершена
            window.location.href = PUBLIC_URL.login();
         }
      }

      return Promise.reject(new Error(message));
   },
);

export { axiosClassic, apiClient };
