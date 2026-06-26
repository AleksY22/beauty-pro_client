import { ILastUsers } from '../../types/statistics.interface';
import Image from 'next/image';

import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
} from '@/shared/components/ui';
import { formatPrice } from '@/shared/lib/format-price';

interface ILastUsersProps {
   data: ILastUsers[];
}

export function LastUsers({ data }: ILastUsersProps) {
   return (
      <Card className="h-full">
         <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-4">
            <CardTitle className="text-xl font-medium tracking-[0.1px] line-clamp-1">
               Покупатели
            </CardTitle>
         </CardHeader>
         <CardContent>
            {data.length ? (
               data.map((user) => (
                  <div className="flex items-center mt-5" key={user.id}>
                     <Image
                        src={user.picture}
                        width={40}
                        height={40}
                        alt={user.name}
                        className="rounded-full"
                     />
                     <div className="ml-4 space-y-1 text-sm text-muted-foreground">
                        <p className="leading-none font-medium">{user.name}</p>
                        <p className="">{user.email}</p>
                     </div>
                     <div className="ml-auto font-medium">
                        {formatPrice(user.total)}
                     </div>
                  </div>
               ))
            ) : (
               <div>Покупатели отсутствуют!</div>
            )}
         </CardContent>
      </Card>
   );
}
