import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { ToggleTheme } from '@/shared/components/ui';
import { SITE_DESCRIPTION, SITE_NAME } from '@/shared/constants/seo.constants';
import { MainProvider } from '@/shared/providers';

import './globals.css';

const geistSans = Geist({
   variable: '--font-geist-sans',
   subsets: ['latin', 'cyrillic'],
});

const geistMono = Geist_Mono({
   variable: '--font-geist-mono',
   subsets: ['latin'],
   preload: false,
});

export const metadata: Metadata = {
   title: {
      absolute: SITE_NAME,
      template: `%s | ${SITE_NAME}`,
   },
   description: SITE_DESCRIPTION,
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="ru" suppressHydrationWarning>
         <body
            className={`${geistMono.variable} ${geistSans.variable} font-sans antialiased`}
         >
            <MainProvider>
               <div className="relative flex flex-col min-h-screen">
                  <ToggleTheme />
                  {children}
               </div>
            </MainProvider>
         </body>
      </html>
   );
}
