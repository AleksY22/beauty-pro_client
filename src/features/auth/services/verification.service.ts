import { axiosClassic } from '@/shared/api/api.interceptors';
import { API_URL } from '@/shared/config/api.config';

class VerificationService {
   public async newVerification(token: string | null) {
      const response = await axiosClassic({
         url: API_URL.auth('email-confirmation'),
         method: 'POST',
         data: { token },
      });

      return response;
   }
}

export const verificationService = new VerificationService();
