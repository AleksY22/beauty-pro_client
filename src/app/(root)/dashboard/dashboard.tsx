'use client';

import { PencilLine, Settings, SquareMenu } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { LuLogOut } from 'react-icons/lu';

import { DataTable } from '@/shared/components/data-table/data-table-with-page';
import {
   Button,
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
   Loading,
} from '@/shared/components/ui';
import { ADMIN_URL, DASHBOARD_URL } from '@/shared/config/url.config';
import { useProfile } from '@/shared/hooks/useProfile';
import { formatDate } from '@/shared/lib/format-date';
import { formatPrice } from '@/shared/lib/format-price';

import {
   IOrderColumn,
   orderColumns,
} from '@/features/order/components/order-user-columns';
import { useGetUserOrders } from '@/features/order/hooks/useGetUserOrders';
import { useLogoutMutation } from '@/features/user/hooks';

export function Dashboard() {
   const { user, isLoading } = useProfile();
   const { logout, isLoadingLogout } = useLogoutMutation();
   const {
      orders,
      meta,
      isLoading: isLoadingOrders,
      page,
      setPage,
      perPage,
      setPerPage,
   } = useGetUserOrders();
   const router = useRouter();

   const onSettings = () => {
      router.push(DASHBOARD_URL.settings());
   };

   const onAdmin = () => {
      router.push(ADMIN_URL.root());
   };

   const formattedOrders: IOrderColumn[] = useMemo(() => {
      return orders.map((order) => ({
         id: order.id,
         createdAt: formatDate(order.createdAt),
         status: order.status,
         total: formatPrice(Number(order.total)),
      }));
   }, [orders]);

   return (
      <div className="my-6">
         <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Ваши заказы</h1>
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button className="flex items-center" disabled={isLoading}>
                     <SquareMenu className="mr-2 size-4" />
                     Меню
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent>
                  <DropdownMenuItem onClick={onSettings}>
                     <Settings className="mr-2 size-4" />
                     Настройки
                  </DropdownMenuItem>
                  {user?.role === 'ADMIN' ? (
                     <DropdownMenuItem onClick={onAdmin}>
                        <PencilLine className="mr-2 size-4" />
                        Админ
                     </DropdownMenuItem>
                  ) : null}
                  <DropdownMenuItem
                     disabled={isLoadingLogout}
                     onClick={() => logout()}
                  >
                     <LuLogOut className="mr-2 size-4" />
                     Выйти
                  </DropdownMenuItem>
               </DropdownMenuContent>
            </DropdownMenu>
         </div>
         <div className="p-6">
            {isLoadingOrders ? (
               <div className="p-6 text-center text-muted-foreground animate-pulse">
                  <Loading />
               </div>
            ) : (
               <DataTable
                  columns={orderColumns}
                  data={formattedOrders}
                  filterKey="createdAt"
                  rowCount={meta.totalCount}
                  pageCount={meta.totalPages}
                  paginationState={{
                     pageIndex: page - 1,
                     pageSize: perPage,
                  }}
                  onPageChange={(newPage) => setPage(newPage + 1)}
                  onPageSizeChange={(newSize) => setPerPage(newSize)}
               />
            )}
         </div>
      </div>
   );
}
