// import {
//   getAccessToken,
//   removeTokenFromStorage,
// } from '../../features/auth/services/auth-token.service';
// import { authService } from '../../features/auth/services/auth.service';
import { SERVER_URL } from '../config/api.config';
import { PUBLIC_URL } from '../config/url.config';
import axios, { CreateAxiosDefaults } from 'axios';

import { getContentType } from './api.helper';

const options: CreateAxiosDefaults = {
   baseURL: SERVER_URL,
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
