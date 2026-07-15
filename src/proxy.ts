import { type NextRequest, NextResponse } from 'next/server';

import { PUBLIC_URL } from './shared/config/url.config';

export default function proxy(request: NextRequest) {
   const { nextUrl, cookies } = request;

   const session = cookies.get('session')?.value;
   const pathname = nextUrl.pathname;

   //Проксирование api
   if (pathname.startsWith('/api')) {
      const backendOrigin =
         process.env.ALLOWED_ORIGIN || 'http://localhost:4000';

      // Просто перенаправляем /api/users/profile прямо на http://localhost:4000/api/users/profile
      const targetUrl = new URL(pathname + nextUrl.search, backendOrigin);

      // Проксируем запрос, сохраняя куки и заголовки браузера
      return NextResponse.rewrite(targetUrl);
   }

   const isAuthPage = pathname.startsWith(PUBLIC_URL.auth());

   if (isAuthPage) {
      if (session) {
         return NextResponse.redirect(new URL(PUBLIC_URL.home(), nextUrl));
      }

      return NextResponse.next();
   }

   // ОПРЕДЕЛЯЕМ ПРИВАТНЫЕ ЗОНЫ
   const isDashboardPage = pathname.startsWith('/dashboard');
   const isAdminPage = pathname.startsWith('/admin');

   // Если страница приватная, а сессии у пользователя нет — отправляем авторизоваться
   if ((isDashboardPage || isAdminPage) && !session) {
      return NextResponse.redirect(new URL(PUBLIC_URL.login(), nextUrl));
   }

   return NextResponse.next();
}

export const config = {
   matcher: [
      '/auth/:path*',
      '/dashboard/:path*',
      '/admin/:path*',
      '/api/:path*',
   ],
};
