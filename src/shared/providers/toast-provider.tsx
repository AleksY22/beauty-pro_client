'use client';

import { Toaster } from '../components/soner';

export function ToastProvider() {
   return <Toaster position="top-center" duration={5000} />;
}
