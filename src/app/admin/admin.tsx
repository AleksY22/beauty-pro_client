'use client';

import { Heading } from '@/shared/components/heading';

import { MainStatistics } from '@/features/statistics/components/main-statistics/main-statistics';
import { MiddleStatistics } from '@/features/statistics/components/middle-statistics/middle-statistics';

export function Admin() {
   return (
      <div className="p-6">
         <Heading title="Статистика" />
         <MainStatistics />
         <MiddleStatistics />
      </div>
   );
}
