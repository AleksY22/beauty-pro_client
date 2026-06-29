import { IProductVariant } from '@/features/product-variant/types/product-variant.interface';
import { IUser } from '@/features/user/types/user.interface';

// Ответ от API при создании заказа (метод checkout)
export interface IPaymentResponse {
   orderId: string;
   paymentUrl: string | null; // Ссылка на ЮKassa или null для наличных/ЕРИП
}

// Статусы заказа
export enum OrderStatus {
   PENDING = 'PENDING',
   PAID_AND_WAITING = 'PAID_AND_WAITING',
   PAID_AND_DELIVERING = 'PAID_AND_DELIVERING',
   DELIVERING = 'DELIVERING',
   CANCELLED = 'CANCELLED',
   COMPLETED = 'COMPLETED',
}

export interface IOrder {
   id: string;
   createdAt: string;
   items: IOrderItem[];
   status: OrderStatus;
   user: IUser | null;
   total: number;
   firstName: string;
   lastName?: string;
   phone: string;
   email: string;
   address?: string;
   comment?: string;
   deliveryMethodId: string;
   paymentMethodId: string;
}

export interface IOrderItem {
   id: string;
   quantity: number;
   priceAtPurchase: number;
   variant: IProductVariant;
}

// Полный ответ ЮKassa (если прокидывать его с бэкэнда целиком)
export interface IYookassaFullResponse {
   id: string;
   status: string;
   amount: { value: string; currency: string };
   recipient: { account_id: string; gateway_id: string };
   payment_method: { type: string; id: string; saved: boolean };
   created_at: string; // С бэкэнда даты приходят строкой, а не объектом Date
   confirmation: { type: string; return_url: string; confirmation_url: string };
}

export const STATUS_TRANSLATIONS: Record<
   OrderStatus,
   { text: string; color: string }
> = {
   [OrderStatus.PENDING]: {
      text: 'В ожидании',
      color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500',
   },
   [OrderStatus.PAID_AND_WAITING]: {
      text: 'Оплачен, в обработке',
      color: 'bg-yellow-300 text-green-800 dark:bg-yellow-900/30 dark:text-green-500',
   },
   [OrderStatus.PAID_AND_DELIVERING]: {
      text: 'Оплачен, доставляется',
      color: 'bg-green-300 text-green-800 dark:bg-green-900/30 dark:text-green-500',
   },
   [OrderStatus.DELIVERING]: {
      text: 'Неоплачен, доставляется',
      color: 'bg-red-400 text-green-800 dark:bg-red-900/30 dark:text-green-500',
   },
   [OrderStatus.COMPLETED]: {
      text: 'Завершен',
      color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500',
   },
   [OrderStatus.CANCELLED]: {
      text: 'Отменен',
      color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500',
   },
};
