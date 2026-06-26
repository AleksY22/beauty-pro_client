import { Card, CardContent, CardHeader } from '@/shared/components/ui/card';
import { Skeleton } from '@/shared/components/ui/skeleton';

export function MainStatisticsItemSkeleton() {
   return (
      <Card className="drop-shadow-sm w-full">
         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            {/* Скелетон для названия (Заголовка) */}
            <Skeleton className="h-7 w-full max-w-32 bg-slate-200" />

            {/* Скелетон для иконки (размер size-7 равен 28px) */}
            <Skeleton className="h-7 w-7 shrink-0 rounded-md bg-slate-200" />
         </CardHeader>

         <CardContent>
            {/* Скелетон для числа (Размер text-2xl) */}
            <Skeleton className="h-7 w-full max-w-24 bg-slate-200" />
         </CardContent>
      </Card>
   );
}
