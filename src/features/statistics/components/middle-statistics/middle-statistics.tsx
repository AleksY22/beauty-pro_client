import { LastUsersSkeleton } from './lasr-users-skeleton';
import { LastUsers } from './last-users';
import { Overview } from './overview';
import { OverviewSkeleton } from './overview-skeleton';
import { useGetStatistics } from '@/features/statistics/hooks/useGetStatistics';

export function MiddleStatistics() {
   const { middle } = useGetStatistics();

   const hasData = Boolean(
      middle?.monthlySales?.length || middle?.lastUsers?.length,
   );

   return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6 xl:grid-cols-7 mt-6">
         {hasData ? (
            <>
               <div className="col-span-1 lg:col-span-3 xl:col-span-4 h-full">
                  <Overview data={middle?.monthlySales ?? []} />
               </div>
               <div className="col-span-1 lg:col-span-3 h-full">
                  <LastUsers data={middle?.lastUsers ?? []} />
               </div>
            </>
         ) : (
            // <div>Статистические данные отсутствуют!</div>
            <>
               <div className="col-span-1 lg:col-span-3 xl:col-span-4">
                  <OverviewSkeleton />
               </div>
               <div className="col-span-1 lg:col-span-3">
                  <LastUsersSkeleton />
               </div>
            </>
         )}
      </div>
   );
}
