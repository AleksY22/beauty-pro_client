'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { PaymentForm } from '@/features/payment/components/payment-form';
import { paymentService } from '@/features/payment/services/payment.service';

export function PaymentEdit() {
   const params = useParams<{ paymentId: string }>();

   const { data } = useQuery({
      queryKey: ['get payment', params.paymentId],
      queryFn: () => paymentService.getById(params.paymentId),
      enabled: !!params.paymentId,
   });

   return <PaymentForm payment={data} />;
}
