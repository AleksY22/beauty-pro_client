import {
   IMainStatistics,
   IMiddleStatistics,
} from '../types/statistics.interface';

import { axiosClassic } from '@/shared/api/api.interceptors';
import { API_URL } from '@/shared/config/api.config';

class StatisticsService {
   async getMain() {
      const { data } = await axiosClassic<IMainStatistics[]>({
         url: API_URL.statistics(`main`),
         method: 'GET',
      });

      return data;
   }

   async getMiddle() {
      const { data } = await axiosClassic<IMiddleStatistics>({
         url: API_URL.statistics(`middle`),
         method: 'GET',
      });

      return data;
   }
}

export const statisticsService = new StatisticsService();
