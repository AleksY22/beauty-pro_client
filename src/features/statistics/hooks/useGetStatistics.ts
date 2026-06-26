import { statisticsService } from '../services/statistics.service';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export const useGetStatistics = () => {
   const { data: main } = useQuery({
      queryKey: ['main statistics'],
      queryFn: () => statisticsService.getMain(),
   });

   const { data: middle } = useQuery({
      queryKey: ['middle statistics'],
      queryFn: () => statisticsService.getMiddle(),
   });

   return useMemo(() => ({ main, middle }), [main, middle]);
};
