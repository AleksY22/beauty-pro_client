export interface IAvailableAttribute {
   name: string;
   values: string[];
}

export interface ICategory {
   id: string;
   createdAt: string;
   title: string;
   description: string;
   image: string;
   availableAttributes?: IAvailableAttribute[];
}

export type ICategoryInput = Pick<ICategory, 'title' | 'description' | 'image'>;
