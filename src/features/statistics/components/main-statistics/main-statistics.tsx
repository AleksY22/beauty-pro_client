import { MainStatisticsItem } from './main-statistics-item';
import { MainStatisticsItemSkeleton } from './main-statistics-skeleton';
import { useGetStatistics } from '@/features/statistics/hooks/useGetStatistics';

export function MainStatistics() {
   const { main } = useGetStatistics();

   return (
      <div className="mt-3 grid grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
         {main?.length ? (
            main.map((item) => <MainStatisticsItem key={item.id} item={item} />)
         ) : (
            // <div>Статистические данные отсутствуют!</div>
            <>
               {Array.from({ length: 4 }).map((_, index) => (
                  <MainStatisticsItemSkeleton key={index} />
               ))}
            </>
         )}
      </div>
   );
}
