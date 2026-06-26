export interface IDelivery {
   id: string;
   createdAt: string;
   name: string;
   code: string;
   description: string;
   isEnabled: boolean;
   instruction?: string;
}

export interface IDeliveryInput {
   name: string;
   code: string;
   description: string;
   isEnabled: boolean;
   instruction?: string;
}
