import type { Metadata } from 'next';

import { Home } from './home';
import { productVariantService } from '@/features/product-variant/services/product-variant.service';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
   title: 'Косметика для Вас',
};

async function getVariants() {
   try {
      const data = await productVariantService.getMostPopular();
      // Проверяем, что данные пришли и это массив, затем берем первые 6
      if (Array.isArray(data)) {
         return data.slice(0, 6);
      }
      return [];
   } catch (error) {
      console.error('Ошибка при загрузке популярных товаров:', error);
      return [];
   }
}

export default async function HomePage() {
   const data = await getVariants();

   return <Home variants={data} />;
}
