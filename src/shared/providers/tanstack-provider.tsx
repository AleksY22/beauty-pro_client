'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type PropsWithChildren, useState } from 'react';

export function TanstackProvider({ children }: PropsWithChildren<unknown>) {
   const [client] = useState(
      new QueryClient({
         defaultOptions: {
            queries: {
               //при смене фокуса не уходил запрос
               refetchOnWindowFocus: false,
            },
         },
      }),
   );

   return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
