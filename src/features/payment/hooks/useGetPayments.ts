'use client';

import { paymentService } from '../services/payment.service';
import { useQuery } from '@tanstack/react-query';

export const useGetPayments = () => {
   const { data: payments, isLoading } = useQuery({
      queryKey: ['get payments for store'],
      queryFn: () => paymentService.getAvailable(),
      select: (data) => data || [],
   });

   return {
      payments,
      isLoading,
   };
};
