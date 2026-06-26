import { TypeNewPasswordSchema, TypeResetPasswordSchema } from '../schemes';

import { axiosClassic } from '@/shared/api/api.interceptors';
import { API_URL } from '@/shared/config/api.config';

class PasswordRecoveryService {
   //=================================================================
   public async resetPassword(
      body: TypeResetPasswordSchema,
      recaptcha?: string,
   ) {
      const headers = recaptcha ? { recaptcha } : undefined;

      const response = await axiosClassic({
         url: API_URL.auth('password-recovery/reset'),
         method: 'POST',
         data: body,
         headers,
      });

      return response;
   }

   //=================================================================
   public async newPassword(
      body: TypeNewPasswordSchema,
      token: string | null,
      recaptcha?: string,
   ) {
      const headers = recaptcha ? { recaptcha } : undefined;

      const response = await axiosClassic({
         url: API_URL.auth(`password-recovery/new/${token}`),
         method: 'POST',
         data: body,
         headers,
      });

      return response;
   }
}

export const passwordRecoveryService = new PasswordRecoveryService();
