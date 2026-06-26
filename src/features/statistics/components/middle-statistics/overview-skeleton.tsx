import { Card, CardContent, CardHeader } from '@/shared/components/ui/card';
import { Skeleton } from '@/shared/components/ui/skeleton';

// Или обычный div с классами

export function OverviewSkeleton() {
   return (
      <Card className="w-full">
         {/* Шапка карточки — имитируем заголовок "Прибыль" */}
         <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-4">
            <Skeleton className="h-7 w-24" />
         </CardHeader>

         {/* Контент карточки — имитируем график */}
         <CardContent className="p-6">
            {/* Контейнер равен по высоте оригинальному графику (h-77.5) */}
            <div className="flex aspect-auto h-63 w-full flex-col justify-between">
               {/* Имитация сетки и тела графика */}
               <div className="relative flex flex-1 flex-col justify-between pb-4">
                  <div className="h-px w-full bg-muted/40" />
                  <div className="h-px w-full bg-muted/40" />
                  <div className="h-px w-full bg-muted/40" />
                  <div className="h-px w-full bg-muted/40" />

                  {/* Силуэт области графика (Area) */}
                  <Skeleton
                     className="absolute bottom-4 left-0 right-0 h-32 w-full opacity-50"
                     style={{
                        clipPath:
                           'polygon(0 80%, 20% 45%, 40% 65%, 60% 25%, 80% 55%, 100% 15%, 100% 100%, 0% 100%)',
                     }}
                  />
               </div>

               {/* Имитация подписей оси X (даты) */}
               <div className="flex justify-between px-2 pt-2">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-12" />
               </div>
            </div>
         </CardContent>
      </Card>
   );
}
