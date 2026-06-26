/* eslint-disable @typescript-eslint/no-explicit-any */
import {
   IFilterParams,
   IProductVariant,
} from '@/features/product-variant/types/product-variant.interface';

export interface ICatalog {
   title: string;
   variants: IProductVariant[];
   isLoading?: boolean;
   currentPage?: number;
   totalPages?: number;
   onPageChange?: (page: number) => void;
   activeFilters?: IFilterParams;
   onFilterChange?: (filters: IFilterParams) => void;
   availableAttributes?: any[];
}
