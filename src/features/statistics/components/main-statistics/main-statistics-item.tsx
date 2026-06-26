/* eslint-disable react-hooks/static-components */
import CountUp from 'react-countup';

import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
} from '@/shared/components/ui';
import { formatPrice } from '@/shared/lib/format-price';

import { IMainStatistics } from '@/features/statistics/types/statistics.interface';
import { getIcon } from '@/features/statistics/utils/statistics.utils';

interface MainStatisticsItemProps {
   item: IMainStatistics;
   className?: string;
}

export function MainStatisticsItem({ item }: MainStatisticsItemProps) {
   const Icon = getIcon(item.id);

   return (
      <Card className="drop-shadow-sm">
         <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-2xl font-medium text-slate-500">
               {item.name}
            </CardTitle>
            <Icon className="size-7" />
         </CardHeader>
         <CardContent>
            <h2 className="text-2xl font-bold">
               {item.id !== 1 ? (
                  <CountUp end={item.value} />
               ) : (
                  <CountUp
                     end={item.value}
                     decimals={2}
                     formattingFn={formatPrice}
                  />
               )}
            </h2>
         </CardContent>
      </Card>
   );
}
