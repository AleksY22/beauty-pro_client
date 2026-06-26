export interface IPayment {
   id: string;
   createdAt: string;
   name: string;
   code: string;
   description: string;
   isEnabled: boolean;
   instruction?: string;
}

export interface IPaymentInput {
   name: string;
   code: string;
   description: string;
   isEnabled: boolean;
   instruction?: string;
}
