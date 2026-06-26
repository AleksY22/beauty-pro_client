import {
   Card,
   CardContent,
   CardHeader,
   Skeleton,
} from '@/shared/components/ui';

export function LastUsersSkeleton() {
   return (
      <Card>
         <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-4">
            {/* Заглушка для заголовка */}
            <Skeleton className="h-7 w-32" />
         </CardHeader>
         <CardContent>
            {/* Генерируем 5 строк-заглушек */}
            {Array.from({ length: 5 }).map((_, index) => (
               <div className="flex items-center mt-5" key={index}>
                  {/* Круглый аватар */}
                  <Skeleton className="h-10 w-10 rounded-full" />

                  {/* Текстовые строки (имя и email) */}
                  <div className="ml-4 space-y-2">
                     <Skeleton className="h-4 w-28" />
                     <Skeleton className="h-3 w-40" />
                  </div>

                  {/* Сумма справа */}
                  <Skeleton className="ml-auto h-5 w-16" />
               </div>
            ))}
         </CardContent>
      </Card>
   );
}
