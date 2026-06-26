export interface IAdvertisement {
   id: string;
   createdAt: string;
   title: string;
   image: string;
}

export type IAdvertisementInput = Pick<IAdvertisement, 'title' | 'image'>;
