'use client';

import { useCreatePromotion } from '../hooks/useCreatePromotion';
import { useDeletePromotion } from '../hooks/useDeletePromotion';
import { useUpdatePromotion } from '../hooks/useUpdatePromotion';
import { IPromotion, IPromotionInput } from '../types/promotion.interface';
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

interface PromotionFormProps {
   promotion?: IPromotion;
}

export function PromotionForm({ promotion }: PromotionFormProps) {
   const router = useRouter();

   const { createPromotion, isLoadingCreate } = useCreatePromotion();
   const { updatePromotion, isLoadingUpdate } = useUpdatePromotion();
   const { deletePromotion, isLoadingDelete } = useDeletePromotion();

   const title = promotion ? 'Изменить данные' : 'Создать акцию';
   const description = promotion
      ? 'Изменить данные о акции'
      : 'Добавить новую акцию';
   const action = promotion ? 'Сохранить' : 'Создать';

   const isPending = isLoadingUpdate || isLoadingCreate || isLoadingDelete;

   const form = useForm<IPromotionInput>({
      mode: 'onChange',
      values: {
         title: promotion?.title || '',
         date: promotion?.date || '',
         image: promotion?.image || '',
      },
   });

   const onSubmit: SubmitHandler<IPromotionInput> = (data) => {
      if (promotion) updatePromotion(data);
      else createPromotion(data);
   };

   return (
      <div className="p-6">
         <div className="flex items-center justify-between">
            <Heading title={title} description={description} />
            {promotion && (
               <ConfirmModal handleClick={() => deletePromotion()}>
                  <Button size="icon" disabled={isPending}>
                     <Trash className="size-4" />
                  </Button>
               </ConfirmModal>
            )}
         </div>
         <form
            id="form-promotion"
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
                        <FieldLabel htmlFor="promotion-image">
                           Картинки
                        </FieldLabel>
                        <ImageUpload
                           isDisabled={isPending}
                           onChange={field.onChange}
                           value={field.value}
                           folder="promotions"
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
                           <FieldLabel htmlFor="promotion-title">
                              Название акции
                           </FieldLabel>
                           <Input
                              id="promotion-title"
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
                     name="date"
                     rules={{
                        required: 'Обязательное поле',
                     }}
                     render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                           <FieldLabel htmlFor="promotion-date">
                              Дата окончания
                           </FieldLabel>
                           <Input
                              id="promotion-date"
                              type="text"
                              placeholder="Введите дату"
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
