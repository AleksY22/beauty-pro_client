import { Loading } from '@/shared/components/ui/loader-v2';

export function ProductLoader() {
   return (
      <div className="w-full flex items-center justify-center h-100">
         <Loading />
      </div>
   );
}
