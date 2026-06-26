'use client';

import { useCreateCategory } from '../hooks/useCreateCategory';
import { useDeleteCategory } from '../hooks/useDeleteCategory';
import { useUpdateCategory } from '../hooks/useUpdateCategory';
import { ICategory, ICategoryInput } from '../types/category.interface';
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

interface CategoryFormProps {
   category?: ICategory;
}

export function CategoryForm({ category }: CategoryFormProps) {
   const router = useRouter();

   const { createCategory, isLoadingCreate } = useCreateCategory();
   const { updateCategory, isLoadingUpdate } = useUpdateCategory();
   const { deleteCategory, isLoadingDelete } = useDeleteCategory();

   const title = category ? 'Изменить данные' : 'Создать категорию';
   const description = category
      ? 'Изменить данные о категории'
      : 'Добавить новую категорию';
   const action = category ? 'Сохранить' : 'Создать';

   const isPending = isLoadingUpdate || isLoadingCreate || isLoadingDelete;

   const form = useForm<ICategoryInput>({
      mode: 'onChange',
      values: {
         title: category?.title || '',
         description: category?.description || '',
         image: category?.image || '',
      },
   });

   const onSubmit: SubmitHandler<ICategoryInput> = (data) => {
      if (category) updateCategory(data);
      else createCategory(data);
   };

   return (
      <div className="p-6">
         <div className="flex items-center justify-between">
            <Heading title={title} description={description} />
            {category && (
               <ConfirmModal handleClick={() => deleteCategory()}>
                  <Button size="icon" disabled={isPending}>
                     <Trash className="size-4" />
                  </Button>
               </ConfirmModal>
            )}
         </div>
         <form
            id="form-category"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 h-full"
         >
            <FieldGroup>
               <Controller
                  control={form.control}
                  name="image"
                  rules={{
                     required: 'Загрузите картинку',
                  }}
                  render={({ field, fieldState }) => (
                     <Field data-invalid={fieldState.invalid} className="mt-4">
                        <FieldLabel htmlFor="category-image">
                           Картинки
                        </FieldLabel>
                        <ImageUpload
                           isDisabled={isPending}
                           onChange={field.onChange}
                           value={field.value}
                           folder="categories"
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
                           <FieldLabel htmlFor="category-title">
                              Название категории
                           </FieldLabel>
                           <Input
                              id="category-title"
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
                     name="description"
                     rules={{
                        required: 'Обязательное поле',
                     }}
                     render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                           <FieldLabel htmlFor="category-description">
                              Описание
                           </FieldLabel>
                           <Input
                              id="category-description"
                              type="text"
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
