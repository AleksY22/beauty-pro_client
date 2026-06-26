import {
   IOrder,
   IOrderItem,
   IPaymentResponse,
   OrderStatus,
} from '../types/order.interface';

import { axiosClassic } from '@/shared/api/api.interceptors';
import { API_URL } from '@/shared/config/api.config';

import { IDelivery } from '@/features/delivery/types/delivery.interface';
import { IPayment } from '@/features/payment/types/payment.interface';
import { IUser } from '@/features/user/types/user.interface';

export type TypeOrderRequestData = {
   firstName: string;
   lastName?: string;
   phone: string;
   email: string;
   address?: string;
   comment?: string;
   deliveryMethodId: string;
   paymentMethodId: string;
   items: {
      quantity: number;
      variantId: string;
   }[];
};

interface IOrderResponse {
   orders: IOrder[];
   meta: {
      totalCount: number;
      currentPage: number;
      totalPages: number;
      hasMore: boolean;
   };
}

export interface IFullOrderResponse {
   id: string;
   createdAt: string;
   items: IOrderItem[];
   status: OrderStatus;
   user: IUser | null;
   total: number;
   firstName: string;
   lastName: string | null;
   phone: string;
   email: string;
   address: string | null;
   comment: string | null;
   deliveryMethod: IDelivery | null;
   paymentMethod: IPayment | null;
}

export interface IPaginationParams {
   page?: number;
   perPage?: number;
}

class OrderService {
   //Все заказы — только для админа========================
   async getAll(params: IPaginationParams = {}) {
      const { data } = await axiosClassic<IOrderResponse>({
         url: API_URL.orders(),
         method: 'GET',
         params,
      });
      return data;
   }

   //Заказы текущего пользователя========================
   async getMyOrders(params: IPaginationParams = {}) {
      const { data } = await axiosClassic<IOrderResponse>({
         url: API_URL.orders('my-orders'),
         method: 'GET',
         params,
      });
      return data;
   }

   //===============================================
   async getById(orderId: string) {
      const { data } = await axiosClassic<IFullOrderResponse>({
         url: API_URL.orders(`by-id/${orderId}`),
         method: 'GET',
      });
      return data;
   }

   //===============================================
   async updateStatusManual(orderId: string, status: string) {
      const { data } = await axiosClassic<IFullOrderResponse>({
         url: API_URL.orders(`${orderId}/status`),
         method: 'PATCH',
         data: { status },
      });
      return data;
   }

   //Создание платежа====================================
   async checkout(data: TypeOrderRequestData) {
      return axiosClassic<IPaymentResponse>({
         url: API_URL.orders('place'),
         method: 'POST',
         data,
      });
   }
}

export const orderService = new OrderService();
