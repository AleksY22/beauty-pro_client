'use client';

import { useCreateProduct } from '../hooks/useCreateProduct';
import { useDeleteProduct } from '../hooks/useDeleteProduct';
import { useUpdateProduct } from '../hooks/useUpdateProduct';
import { IProduct, IProductInput } from '../types/product.interface';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { ConfirmModal } from '@/shared/components/confirm-modal';
import { Heading } from '@/shared/components/heading';
import { ImageUpload } from '@/shared/components/image-upload';
import {
   Button,
   Field,
   FieldError,
   FieldGroup,
   FieldLabel,
   Input,
} from '@/shared/components/ui';
import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/shared/components/ui/select';
import { Textarea } from '@/shared/components/ui/textarea';

import { ICategory } from '@/features/category/types/category.interface';

interface ProductFormProps {
   product?: IProduct;
   categories: ICategory[];
}

export function ProductForm({ product, categories }: ProductFormProps) {
   const router = useRouter();

   const { createProduct, isLoadingCreate } = useCreateProduct();
   const { updateProduct, isLoadingUpdate } = useUpdateProduct();
   const { deleteProduct, isLoadingDelete } = useDeleteProduct();

   const title = product ? 'Изменить данные' : 'Создать товар';
   const description = product
      ? 'Изменить данные о товаре'
      : 'Добавить новый товар в магазин';
   const action = product ? 'Сохранить' : 'Создать';

   const isPending = isLoadingUpdate || isLoadingCreate || isLoadingDelete;

   const form = useForm<IProductInput>({
      mode: 'onChange',
      values: {
         title: product?.title || '',
         description: product?.description || '',
         images: product?.images || [],
         categoryId: product?.category?.id || '',
      },
   });

   const onSubmit: SubmitHandler<IProductInput> = (data) => {
      if (product) updateProduct(data);
      else createProduct(data);
   };

   return (
      <div className="p-6">
         <div className="flex items-center justify-between">
            <Heading title={title} description={description} />
            {product && (
               <ConfirmModal handleClick={() => deleteProduct()}>
                  <Button size="icon" disabled={isPending} type="button">
                     <Trash className="size-4" />
                  </Button>
               </ConfirmModal>
            )}
         </div>
         <form
            id="form-product"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 h-full"
         >
            <FieldGroup>
               <Controller
                  control={form.control}
                  name="images"
                  rules={{
                     required: 'Загрузите хотя бы одну картинку',
                  }}
                  render={({ field, fieldState }) => (
                     <Field data-invalid={fieldState.invalid} className="mt-4">
                        <FieldLabel htmlFor="product-images">
                           Картинки
                        </FieldLabel>
                        <ImageUpload
                           isDisabled={isPending}
                           onChange={field.onChange}
                           value={field.value}
                           folder="products"
                        />
                        {fieldState.invalid && (
                           <FieldError errors={[fieldState.error]} />
                        )}
                     </Field>
                  )}
               />

               <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-4">
                  <Controller
                     control={form.control}
                     name="title"
                     rules={{
                        required: 'Обязательное поле',
                     }}
                     render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                           <FieldLabel htmlFor="product-title">
                              Название товара
                           </FieldLabel>
                           <Input
                              id="product-title"
                              type="text"
                              placeholder="Введите название"
                              disabled={isPending}
                              {...field}
                              aria-invalid={fieldState.invalid}
                           />
                           {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                           )}
                        </Field>
                     )}
                  />
                  <Controller
                     control={form.control}
                     name="categoryId"
                     rules={{
                        required: 'Обязательное поле',
                     }}
                     render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                           <FieldLabel htmlFor="product-category">
                              Категория товара
                           </FieldLabel>
                           <Select
                              disabled={isPending}
                              onValueChange={field.onChange}
                              value={field.value}
                           >
                              <SelectTrigger id="product-category">
                                 <SelectValue placeholder="Категория товара" />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectGroup>
                                    {categories.map((category) => (
                                       <SelectItem
                                          key={category.id}
                                          value={category.id}
                                       >
                                          {category.title}
                                       </SelectItem>
                                    ))}
                                 </SelectGroup>
                              </SelectContent>
                           </Select>
                           {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                           )}
                        </Field>
                     )}
                  />
               </div>
               <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
                  <Controller
                     control={form.control}
                     name="description"
                     rules={{
                        required: 'Обязательное поле',
                     }}
                     render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                           <FieldLabel htmlFor="product-description">
                              Описание товара
                           </FieldLabel>
                           <Textarea
                              id="product-description"
                              placeholder="Введите описание"
                              disabled={isPending}
                              {...field}
                              aria-invalid={fieldState.invalid}
                           />
                           {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                           )}
                        </Field>
                     )}
                  />
               </div>
            </FieldGroup>
            <div className="flex items-center gap-x-2">
               <Button
                  type="button"
                  variant="outline"
                  disabled={isPending}
                  onClick={() => router.back()}
               >
                  Отмена
               </Button>
               <Button
                  type="submit"
                  disabled={isPending}
                  className="flex items-center gap-x-4"
               >
                  {action}
               </Button>
            </div>
         </form>
      </div>
   );
}
