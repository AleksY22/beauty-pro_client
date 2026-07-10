import { TypeLoginSchema, TypeRegisterSchema } from '../schemes';

import { axiosClassic } from '@/shared/api/api.interceptors';
import { API_URL } from '@/shared/config/api.config';

class AuthService {
   //================================================================
   public async register(data: TypeRegisterSchema, recaptcha: string) {
      const headers = recaptcha ? { recaptcha } : undefined;

      const response = await axiosClassic({
         url: API_URL.auth('register'),
         method: 'POST',
         data: data,
         headers,
      });

      return response;
   }

   //================================================================
   public async login(data: TypeLoginSchema, recaptcha: string) {
      const headers = recaptcha ? { recaptcha } : undefined;

      const response = await axiosClassic({
         url: API_URL.auth('login'),
         method: 'POST',
         data: data,
         headers,
      });

      return response;
   }
   //================================================================
   public async oauthByProvider(provider: 'google' | 'yandex') {
      const response = await axiosClassic({
         url: `auth/oauth/connect/${provider}`,
         method: 'GET',
      });

      return response;
   }

   //=================================================
   async logout() {
      const response = await axiosClassic<boolean>({
         url: API_URL.auth('logout'),
         method: 'POST',
      });

      return response;
   }
}

export const authService = new AuthService();
