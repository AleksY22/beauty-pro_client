'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { PromotionForm } from '@/features/promotion/components/promotion-form';
import { promotionService } from '@/features/promotion/services/promotion.service';

export function PromotionEdit() {
   const params = useParams<{ promotionId: string }>();

   const { data } = useQuery({
      queryKey: ['get promotion', params.promotionId],
      queryFn: () => promotionService.getById(params.promotionId!),
      enabled: !!params.promotionId,
   });

   return <PromotionForm promotion={data} />;
}
