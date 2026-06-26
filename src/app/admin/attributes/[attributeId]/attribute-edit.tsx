'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { AttributeForm } from '@/features/attribute/components/attribute-form';
import { attributeService } from '@/features/attribute/services/attribute.service';

export function AttributeEdit() {
   const params = useParams<{ attributeId: string }>();

   const { data } = useQuery({
      queryKey: ['get attribute', params.attributeId],
      queryFn: () => attributeService.getById(params.attributeId!),
      enabled: !!params.attributeId,
   });

   return <AttributeForm attribute={data} />;
}
