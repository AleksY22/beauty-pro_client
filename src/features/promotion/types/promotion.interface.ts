export interface IPromotion {
   id: string;
   createdAt: string;
   title: string;
   date: string;
   image: string;
}

export type IPromotionInput = Pick<IPromotion, 'title' | 'date' | 'image'>;
