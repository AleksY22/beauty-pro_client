import { IPayment, IPaymentInput } from '../types/payment.interface';

import { axiosClassic } from '@/shared/api/api.interceptors';
import { API_URL } from '@/shared/config/api.config';

interface IPaymentResponse {
   payments: IPayment[];
   meta: {
      totalCount: number;
      currentPage: number;
      totalPages: number;
      hasMore: boolean;
   };
}

class PaymentService {
   //=======================================
   async getAvailable() {
      const { data } = await axiosClassic<IPayment[]>({
         url: API_URL.payments('available'),
         method: 'GET',
      });
      return data;
   }
   //=======================================
   async getAll(page?: number, perPage?: number) {
      const { data } = await axiosClassic<IPaymentResponse>({
         url: API_URL.payments(),
         method: 'GET',
         params: { page, perPage },
      });
      return data;
   }

   //=======================================
   async getById(paymentId: string) {
      const { data } = await axiosClassic<IPayment>({
         url: API_URL.payments(`by-id/${paymentId}`),
         method: 'GET',
      });

      return data;
   }

   //=======================================
   async create(data: IPaymentInput) {
      const { data: createPayment } = await axiosClassic<IPayment>({
         url: API_URL.payments(),
         method: 'POST',
         data,
      });
      return createPayment;
   }

   //=======================================
   async update(paymentId: string, data: IPaymentInput) {
      const { data: updatedpayment } = await axiosClassic<IPayment>({
         url: API_URL.payments(`${paymentId}`),
         method: 'PUT',
         data,
      });
      return updatedpayment;
   }

   //=======================================
   async delete(paymentId: string) {
      const { data: deletePayment } = await axiosClassic<IPayment>({
         url: API_URL.payments(`${paymentId}`),
         method: 'DELETE',
      });
      return deletePayment;
   }
}

export const paymentService = new PaymentService();
