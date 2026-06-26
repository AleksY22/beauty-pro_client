import { apiClient } from '@/shared/api/api.interceptors';
import { API_URL } from '@/shared/config/api.config';

export interface ILocalCartItem {
   variantId: string;
   quantity: number;
}

export interface ICartItemResponse {
   id: string;
   createdAt: string;
   updatedAt: string;
   userId: string;
   variantId: string;
   quantity: number;
   variant: {
      id: string;
      productId: string;
      price: string;
      sku: string;
      stock: number;
      discount: number;
      product: {
         id: string;
         title: string;
         images: string[];
      };
   };
}

export interface IServerCartItem {
   productId: string;
   variantId: string;
   quantity: number;
}

// class CartService {
//    async mergeCart(localItems: ILocalCartItem[]): Promise<IServerCartItem[]> {
//       const { data: serverItems } = await apiClient<INestJSCartItemResponse[]>({
//          url: API_URL.cart('merge'),
//          method: 'POST',
//          data: { localItems },
//       });

//       return serverItems.map((item: INestJSCartItemResponse) => ({
//          productId: item.variant.productId,
//          variantId: item.variantId,
//          quantity: item.quantity,
//       }));
//    }
// }
class CartService {
   async mergeCart(localItems: ILocalCartItem[]): Promise<IServerCartItem[]> {
      const serverItems = await (apiClient.post(API_URL.cart('merge'), {
         localItems,
      }) as unknown as Promise<ICartItemResponse[]>);

      // 3. Безопасно мапим массив ответов от сервера в формат IServerCartItem[]
      return serverItems.map((item) => ({
         productId: item.variant.productId,
         variantId: item.variantId,
         quantity: item.quantity,
      }));
   }
}
export const cartService = new CartService();
