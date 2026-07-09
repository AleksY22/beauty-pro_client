'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useProfile } from '@/shared/hooks/useProfile';

export function AdminBoundary({ children }: { children: React.ReactNode }) {
   const { user, isLoading } = useProfile();
   const router = useRouter();

   useEffect(() => {
      // Если бэкенд ответил, а юзера нет, или его роль НЕ админ
      if (!isLoading && (!user || user.role !== 'ADMIN')) {
         // Мгновенно выкидываем его на главную страницу сайта
         router.replace('/');
      }
   }, [user, isLoading, router]);

   // Состояние 1: Пока идет запрос к бэкенду — показываем красивый экран загрузки
   if (isLoading) {
      return (
         <div className="flex h-screen w-screen items-center justify-center bg-gray-900 text-white">
            <div className="text-xl font-semibold">
               Проверка прав доступа...
            </div>
         </div>
      );
   }

   // Состояние 2: Бэкенд подтвердил, что это точно ADMIN. Рендерим админку!
   if (user && user.role === 'ADMIN') {
      return <>{children}</>;
   }

   // Состояние 3: Обычный USER (в этот момент срабатывает useEffect и редиректит его)
   return null;
}
