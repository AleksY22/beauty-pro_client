import { Explorer } from './explorer';
import { productService } from '@/features/product/services/product.service';

export const dynamic = 'force-dynamic';

interface PageProps {
   searchParams: Promise<{
      searchTerm?: string;
      page?: string;
      perPage?: string;
   }>;
}

export default async function ExplorerPage({ searchParams }: PageProps) {
   const resolvedParams = await searchParams;

   const searchTerm = resolvedParams.searchTerm;
   const page = Number(resolvedParams.page) || 1;
   const perPage = Number(resolvedParams.perPage) || 10;

   const initialProducts = await productService.getAll(
      searchTerm,
      page,
      perPage,
   );

   return <Explorer products={initialProducts} />;
}
