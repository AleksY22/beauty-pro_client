import { Card, CardContent } from '../ui';
import { Loading } from '../ui/loader-v2';
import { Skeleton } from '../ui/skeleton';
import { FC } from 'react';

export const DataTableLoading: FC = () => {
   return (
      <div className="mx-auto w-full">
         <Skeleton className="h-8 w-48" />
         <Skeleton className="h-8 w-72 mt-6" />
         <Card className="mt-6">
            <CardContent>
               <div className="h-130 w-full flex items-center justify-center">
                  <Loading />
               </div>
            </CardContent>
         </Card>
      </div>
   );
};
