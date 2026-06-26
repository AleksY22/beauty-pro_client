'use client';

import { useCreateAdvertisement } from '../hooks/useCreateAdvertisement';
import { useDeleteAdvertisement } from '../hooks/useDeleteAdvertisement';
import { useUpdateAdvertisement } from '../hooks/useUpdateAdvertisement';
import {
   IAdvertisement,
   IAdvertisementInput,
} from '../types/advertisement.interface';
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

interface AdvertisementFormProps {
   advertisement?: IAdvertisement;
}

export function AdvertisementForm({ advertisement }: AdvertisementFormProps) {
   const router = useRouter();

   const { createAdvertisement, isLoadingCreate } = useCreateAdvertisement();
   const { updateAdvertisement, isLoadingUpdate } = useUpdateAdvertisement();
   const { deleteAdvertisement, isLoadingDelete } = useDeleteAdvertisement();

   const title = advertisement ? 'Изменить данные' : 'Создать рекламу';
   const description = advertisement
      ? 'Изменить данные о рекламе'
      : 'Добавить новую рекламу';
   const action = advertisement ? 'Сохранить' : 'Создать';

   const isPending = isLoadingUpdate || isLoadingCreate || isLoadingDelete;

   const form = useForm<IAdvertisementInput>({
      mode: 'onChange',
      values: {
         title: advertisement?.title || '',
         image: advertisement?.image || '',
      },
   });

   const onSubmit: SubmitHandler<IAdvertisementInput> = (data) => {
      if (advertisement) updateAdvertisement(data);
      else createAdvertisement(data);
   };

   return (
      <div className="p-6">
         <div className="flex items-center justify-between">
            <Heading title={title} description={description} />
            {advertisement && (
               <ConfirmModal handleClick={() => deleteAdvertisement()}>
                  <Button size="icon" disabled={isPending}>
                     <Trash className="size-4" />
                  </Button>
               </ConfirmModal>
            )}
         </div>
         <form
            id="form-advertisement"
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
                        <FieldLabel htmlFor="advertisement-image">
                           Картинки
                        </FieldLabel>
                        <ImageUpload
                           isDisabled={isPending}
                           onChange={field.onChange}
                           value={field.value}
                           folder="advertisements"
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
                           <FieldLabel htmlFor="advertisement-title">
                              Название рекламы
                           </FieldLabel>
                           <Input
                              id="advertisement-title"
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
