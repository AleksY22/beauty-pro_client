'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { ColorForm } from '@/features/color/components/color-form';
import { colorService } from '@/features/color/services/color.service';

export function ColorEdit() {
   const params = useParams<{ colorId: string }>();

   const { data } = useQuery({
      queryKey: ['get color', params.colorId],
      queryFn: () => colorService.getById(params.colorId!),
      enabled: !!params.colorId,
   });

   return <ColorForm color={data} />;
}
