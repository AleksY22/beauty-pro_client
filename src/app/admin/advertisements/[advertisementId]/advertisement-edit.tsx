'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { AdvertisementForm } from '@/features/advertisement/components/advertisement-form';
import { advertisementService } from '@/features/advertisement/services/advertisement.service';

export function AdvertisementEdit() {
   const params = useParams<{ advertisementId: string }>();

   const { data } = useQuery({
      queryKey: ['get advertisement', params.advertisementId],
      queryFn: () => advertisementService.getById(params.advertisementId!),
      enabled: !!params.advertisementId,
   });

   return <AdvertisementForm advertisement={data} />;
}
