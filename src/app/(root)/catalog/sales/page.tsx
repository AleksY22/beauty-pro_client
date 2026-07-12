import { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants';

export const metadata: Metadata = {
   title: 'Распродажа',
   ...NO_INDEX_PAGE,
};

export default function CatalogSales() {
   return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-6 relative overflow-hidden font-sans">
         {/* Декоративные фоновые эффекты */}
         <div className="absolute top-[-20%] left-[-10%] w-150 h-150 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
         <div className="absolute bottom-[-10%] right-[-10%] w-125 h-125 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

         {/* Основной контент */}
         <main className="max-w-2xl w-full mx-auto text-center my-auto z-10 py-12">
            {/* Индикатор статуса */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8 animate-pulse">
               <span className="w-2 h-2 rounded-full bg-blue-400" />
               Активная разработка
            </div>

            {/* Заголовок */}
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 bg-linear-to-b from-white via-slate-200 to-slate-500 bg-clip-text text-transparent">
               Страница находится <br className="hidden sm:block" /> в
               разработке
            </h1>

            {/* Описание */}
            <p className="text-lg text-slate-400 max-w-lg mx-auto mb-10 leading-relaxed">
               Мы усердно работаем над созданием чего-то потрясающего.
            </p>
         </main>
      </div>
   );
}
