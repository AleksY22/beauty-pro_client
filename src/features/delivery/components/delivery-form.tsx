'use client';

import { useCreateDelivery } from '../hooks/useCreateDelivery';
import { useDeleteDelivery } from '../hooks/useDeleteDelivery';
import { useUpdateDelivery } from '../hooks/useUpdateDelivery';
import { IDelivery, IDeliveryInput } from '../types/delivery.interface';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { ConfirmModal } from '@/shared/components/confirm-modal';
import { Heading } from '@/shared/components/heading';
import {
   Button,
   Checkbox,
   Field,
   FieldError,
   FieldGroup,
   FieldLabel,
   Input,
   Textarea,
} from '@/shared/components/ui';

interface DeliveryFormProps {
   delivery?: IDelivery;
}

export function DeliveryForm({ delivery }: DeliveryFormProps) {
   const router = useRouter();

   const { createDelivery, isLoadingCreate } = useCreateDelivery();
   const { updateDelivery, isLoadingUpdate } = useUpdateDelivery();
   const { deleteDelivery, isLoadingDelete } = useDeleteDelivery();

   const title = delivery ? 'Изменить данные' : 'Создать метод доставки';
   const description = delivery
      ? 'Изменить данные о методе доставки'
      : 'Добавить новый метод доставки';
   const action = delivery ? 'Сохранить' : 'Создать';

   const isPending = isLoadingUpdate || isLoadingCreate || isLoadingDelete;

   const form = useForm<IDeliveryInput>({
      mode: 'onChange',
      values: {
         name: delivery?.name || '',
         code: delivery?.code || '',
         description: delivery?.description || '',
         isEnabled: delivery ? delivery.isEnabled : false,
         instruction: delivery?.instruction || '',
      },
   });

   const onSubmit: SubmitHandler<IDeliveryInput> = (data) => {
      if (delivery) updateDelivery(data);
      else createDelivery(data);
   };

   return (
      <div className="p-6">
         <div className="flex items-center justify-between">
            <Heading title={title} description={description} />
            {delivery && (
               <ConfirmModal handleClick={() => deleteDelivery()}>
                  <Button
                     size="icon"
                     disabled={isPending}
                     variant="destructive"
                  >
                     <Trash className="size-4" />
                  </Button>
               </ConfirmModal>
            )}
         </div>
         <form
            id="form-delivery"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 h-full"
         >
            <FieldGroup>
               <div className="grid sm:grid-cols-2 gap-4 mt-4">
                  <Controller
                     control={form.control}
                     name="name"
                     rules={{ required: 'Обязательное поле' }}
                     render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                           <FieldLabel htmlFor="delivery-name">
                              Название метода
                           </FieldLabel>
                           <Input
                              id="delivery-name"
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
                     name="code"
                     rules={{ required: 'Обязательное поле' }}
                     render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                           <FieldLabel htmlFor="delivery-code">
                              Уникальный код (slug)
                           </FieldLabel>
                           <Input
                              id="delivery-code"
                              type="text"
                              placeholder="Введите уникальный код"
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
               <div className="mt-4">
                  <Controller
                     control={form.control}
                     name="description"
                     rules={{ required: 'Обязательное поле' }}
                     render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                           <FieldLabel htmlFor="delivery-description">
                              Описание
                           </FieldLabel>
                           <Input
                              id="delivery-description"
                              type="text"
                              placeholder="Укажите базовые условия"
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
               <div className="mt-4">
                  <Controller
                     control={form.control}
                     name="instruction"
                     render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                           <FieldLabel htmlFor="delivery-instruction">
                              Инструкция для покупателя (необязательно)
                           </FieldLabel>
                           <Textarea
                              id="delivery-instruction"
                              placeholder="Что нужно знать клиенту при выборе этого способа..."
                              disabled={isPending}
                              rows={4}
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
               <div className="mt-4 flex items-center space-y-2">
                  <Controller
                     control={form.control}
                     name="isEnabled"
                     render={({ field }) => (
                        <div className="flex items-center space-x-2">
                           <Checkbox
                              id="delivery-enabled"
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              disabled={isPending}
                           />
                           <label
                              htmlFor="delivery-enabled"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                           >
                              Активировать метод доставки
                           </label>
                        </div>
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
