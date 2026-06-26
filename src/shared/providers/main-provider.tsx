'use client';

import { type PropsWithChildren } from 'react';

import { TanstackProvider } from './tanstack-provider';
import { ThemeProvider } from './theme-provider';
import { ToastProvider } from './toast-provider';

export function MainProvider({ children }: PropsWithChildren<unknown>) {
   return (
      <TanstackProvider>
         <ThemeProvider
            attribute="class"
            defaultTheme="light"
            disableTransitionOnChange
         >
            <ToastProvider />
            {children}
         </ThemeProvider>
      </TanstackProvider>
   );
}
