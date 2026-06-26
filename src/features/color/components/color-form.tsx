'use client';

import { useCreateColor } from '../hooks/useCreateColor';
import { useDeleteColor } from '../hooks/useDeleteColor';
import { useUpdateColor } from '../hooks/useUpdateColor';
import { IColor, IColorInput } from '../types/color.interface';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { ConfirmModal } from '@/shared/components/confirm-modal';
import { Heading } from '@/shared/components/heading';
import {
   Button,
   Field,
   FieldError,
   FieldGroup,
   FieldLabel,
   Input,
} from '@/shared/components/ui';

interface ColorFormProps {
   color?: IColor;
}

export function ColorForm({ color }: ColorFormProps) {
   const router = useRouter();

   const { createColor, isLoadingCreate } = useCreateColor();
   const { updateColor, isLoadingUpdate } = useUpdateColor();
   const { deleteColor, isLoadingDelete } = useDeleteColor();

   const title = color ? 'Изменить данные' : 'Создать цвет';
   const description = color
      ? 'Изменить данные о цвете'
      : 'Добавить новый цвет';
   const action = color ? 'Сохранить' : 'Создать';

   const isPending = isLoadingUpdate || isLoadingCreate || isLoadingDelete;

   const form = useForm<IColorInput>({
      mode: 'onChange',
      values: {
         name: color?.name || '',
         value: color?.value || '',
      },
   });

   const onSubmit: SubmitHandler<IColorInput> = (data) => {
      if (color) updateColor(data);
      else createColor(data);
   };

   return (
      <div className="p-6">
         <div className="flex items-center justify-between">
            <Heading title={title} description={description} />
            {color && (
               <ConfirmModal handleClick={() => deleteColor()}>
                  <Button size="icon" disabled={isPending}>
                     <Trash className="size-4" />
                  </Button>
               </ConfirmModal>
            )}
         </div>
         <form
            id="form-color"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 h-full"
         >
            <FieldGroup>
               <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-4">
                  <Controller
                     control={form.control}
                     name="name"
                     rules={{
                        required: 'Обязательное поле',
                     }}
                     render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                           <FieldLabel htmlFor="color-title">
                              Название цвета
                           </FieldLabel>
                           <Input
                              id="color-title"
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
                     name="value"
                     rules={{
                        required: 'Обязательное поле',
                     }}
                     render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                           <FieldLabel htmlFor="color-value">
                              Значение
                           </FieldLabel>
                           <Input
                              id="color-value"
                              type="text"
                              placeholder="Введите значение цвета"
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
