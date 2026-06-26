'use client';

import { useCreatePayment } from '../hooks/useCreatePayment';
import { useDeletePayment } from '../hooks/useDeletePayment';
import { useUpdatePayment } from '../hooks/useUpdatePayment';
import { IPayment, IPaymentInput } from '../types/payment.interface';
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

interface PaymentFormProps {
   payment?: IPayment;
}

export function PaymentForm({ payment }: PaymentFormProps) {
   const router = useRouter();

   const { createPayment, isLoadingCreate } = useCreatePayment();
   const { updatePayment, isLoadingUpdate } = useUpdatePayment();
   const { deletePayment, isLoadingDelete } = useDeletePayment();

   const title = payment ? 'Изменить данные' : 'Создать метод оплаты';
   const description = payment
      ? 'Изменить данные о методе оплаты'
      : 'Добавить новый метод оплаты';
   const action = payment ? 'Сохранить' : 'Создать';

   const isPending = isLoadingUpdate || isLoadingCreate || isLoadingDelete;

   const form = useForm<IPaymentInput>({
      mode: 'onChange',
      values: {
         name: payment?.name || '',
         code: payment?.code || '',
         description: payment?.description || '',
         isEnabled: payment ? payment.isEnabled : false,
         instruction: payment?.instruction || '',
      },
   });

   const onSubmit: SubmitHandler<IPaymentInput> = (data) => {
      if (payment) updatePayment(data);
      else createPayment(data);
   };

   return (
      <div className="p-6">
         <div className="flex items-center justify-between">
            <Heading title={title} description={description} />
            {payment && (
               <ConfirmModal handleClick={() => deletePayment()}>
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
            id="form-payment"
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
                           <FieldLabel htmlFor="payment-name">
                              Название метода
                           </FieldLabel>
                           <Input
                              id="payment-name"
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
                           <FieldLabel htmlFor="payment-code">
                              Уникальный код (slug)
                           </FieldLabel>
                           <Input
                              id="payment-code"
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
                           <FieldLabel htmlFor="payment-description">
                              Описание
                           </FieldLabel>
                           <Input
                              id="payment-description"
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
                           <FieldLabel htmlFor="payment-instruction">
                              Инструкция для покупателя (необязательно)
                           </FieldLabel>
                           <Textarea
                              id="payment-instruction"
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
                              id="payment-enabled"
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              disabled={isPending}
                           />
                           <label
                              htmlFor="payment-enabled"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                           >
                              Активировать метод оплаты
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
