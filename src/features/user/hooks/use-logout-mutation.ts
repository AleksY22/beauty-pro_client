'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { PUBLIC_URL } from '@/shared/config/url.config';
import { toastMessageHandler } from '@/shared/lib/toat-message-handler';

import { useCartStore } from '@/store/useCartStore';

import { authService } from '@/features/auth/services/auth.service';

export function useLogoutMutation() {
   const router = useRouter();

   const queryClient = useQueryClient();
   const clearCart = useCartStore((state) => state.clearCart);

   const { mutate: logout, isPending: isLoadingLogout } = useMutation({
      mutationKey: ['logout'],
      mutationFn: () => authService.logout(),
      onSuccess() {
         //очищаем весь кэш React Query (корзину, профиль, заказы)
         queryClient.clear();
         //Очищаем локальную корзину в Zustand и localStorage
         clearCart();

         toast.success('Вы вышли из системы!');
         router.push(PUBLIC_URL.home());
      },
      onError(error) {
         toastMessageHandler(error);
      },
   });

   return { logout, isLoadingLogout };
}
