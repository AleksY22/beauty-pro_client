import { IProductVariant } from '@/features/product-variant/types/product-variant.interface';
import { IUser } from '@/features/user/types/user.interface';

// interface IAmount {
//    value: string;
//    currency: string;
// }

// interface IRecipient {
//    account_id: string;
//    gateway_id: string;
// }

// interface IPaymentMethod {
//    type: string;
//    id: string;
//    saved: boolean;
// }

// interface IConfirmation {
//    type: string;
//    return_url: string;
//    confirmation_url: string;
// }

// 2. Ответ от API при создании заказа (метод checkout)
export interface IPaymentResponse {
   orderId: string;
   paymentUrl: string | null; // Ссылка на ЮKassa или null для наличных/ЕРИП
}

// 1. Статусы заказа
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

// 5. Полный ответ ЮKassa (если прокидывать его с бэкэнда целиком)
export interface IYookassaFullResponse {
   id: string;
   status: string;
   amount: { value: string; currency: string };
   recipient: { account_id: string; gateway_id: string };
   payment_method: { type: string; id: string; saved: boolean };
   created_at: string; // С бэкэнда даты приходят строкой, а не объектом Date
   confirmation: { type: string; return_url: string; confirmation_url: string };
}
