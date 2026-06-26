import { TypeSettingsSchema } from '../schemes/settings.schema';
import { IUser } from '../types/user.interface';

import { axiosClassic } from '@/shared/api/api.interceptors';
import { API_URL } from '@/shared/config/api.config';

class UserService {
   //===========================================
   public async getProfile() {
      const response = await axiosClassic<IUser>({
         url: API_URL.users('profile'),
         method: 'GET',
      });
      return response.data;
   }

   //===========================================
   public async updateProfile(body: TypeSettingsSchema) {
      const response = await axiosClassic<IUser>({
         url: API_URL.users('profile'),
         method: 'PATCH',
         data: body,
      });

      return response.data;
   }

   //===========================================
   async toggleFavorite(productId: string) {
      return await axiosClassic<IUser>({
         url: API_URL.users(`profile/favorites/${productId}`),
         method: 'PATCH',
      });
   }
}

export const userService = new UserService();
