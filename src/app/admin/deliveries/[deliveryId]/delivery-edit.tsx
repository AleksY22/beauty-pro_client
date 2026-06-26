'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { DeliveryForm } from '@/features/delivery/components/delivery-form';
import { deliveryService } from '@/features/delivery/services/delivery.service';

export function DeliveryEdit() {
   const params = useParams<{ deliveryId: string }>();

   const { data } = useQuery({
      queryKey: ['get delivery', params.deliveryId],
      queryFn: () => deliveryService.getById(params.deliveryId),
      enabled: !!params.deliveryId,
   });

   return <DeliveryForm delivery={data} />;
}
