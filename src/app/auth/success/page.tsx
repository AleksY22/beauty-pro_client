import { ArrowLeft, CheckCircle2, Mail } from 'lucide-react';
import Link from 'next/link';

import { PUBLIC_URL } from '@/shared/config/url.config';

export default function SuccessRegistrationPage() {
   return (
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl shadow-slate-200/50 transition-all dark:bg-zinc-900 dark:shadow-none border border-slate-100 dark:border-zinc-800 text-center">
         <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 animate-fade-in dark:bg-emerald-950/30 dark:text-emerald-400">
            <CheckCircle2 className="h-10 w-10 stroke-[1.5] animate-scale-up" />
         </div>
         <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-50 sm:text-3xl">
            Почти готово!
         </h1>
         <p className="mt-3 text-base text-slate-500 dark:text-zinc-400">
            Регистрация прошла успешно. Мы отправили письмо с подтверждением на
            ваш электронный адрес.
         </p>
         <div className="my-6 rounded-xl bg-slate-50 p-4 dark:bg-zinc-800/40 text-left border border-slate-100 dark:border-zinc-800">
            <div className="flex items-start gap-3">
               <Mail className="mt-0.5 h-5 w-5 text-indigo-500 shrink-0 dark:text-indigo-400" />
               <div>
                  <h4 className="text-sm font-semibold text-slate-800 dark:text-zinc-200">
                     Что делать дальше?
                  </h4>
                  <p className="mt-1 text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                     Перейдите по ссылке в письме для активации вашего аккаунта.
                  </p>
               </div>
            </div>
         </div>
         <div className="flex flex-col gap-3">
            <Link
               href={PUBLIC_URL.home()}
               className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 active:bg-slate-100 transition-all dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
            >
               <ArrowLeft className="h-4 w-4" />
               На главную
            </Link>
         </div>
      </div>
   );
}
