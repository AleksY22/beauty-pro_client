import { NextRequest, NextResponse } from 'next/server';

import { PUBLIC_URL } from './shared/config/url.config';

export default function proxy(request: NextRequest) {
   const { nextUrl, cookies } = request;

   const session = cookies.get('session')?.value;

   const isAuthPage = nextUrl.pathname.startsWith(PUBLIC_URL.auth());

   if (isAuthPage) {
      if (session) {
         return NextResponse.redirect(new URL(PUBLIC_URL.home(), nextUrl));
      }

      return NextResponse.next();
   }

   // // 2. ОПРЕДЕЛЯЕМ ПРИВАТНЫЕ ЗОНЫ (Где гостям быть категорически нельзя)
   // const isDashboardPage = nextUrl.pathname.startsWith('/dashboard');
   // const isAdminPage = nextUrl.pathname.startsWith('/admin');

   // // 3. Если страница приватная, а сессии у пользователя нет — отправляем авторизоваться
   // if ((isDashboardPage || isAdminPage) && !session) {
   //    return NextResponse.redirect(new URL('/auth/login', nextUrl));
   // }

   return NextResponse.next();
}

// export const config = {
//    matcher: ['/auth/:path*', '/dashboard/:path*', '/admin/:path*'],
// };
