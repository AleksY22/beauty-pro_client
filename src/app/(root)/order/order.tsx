'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import * as z from 'zod';

import Breadcrumbs from '@/shared/components/breadcrumbs';
import {
   Button,
   Card,
   CardContent,
   CardHeader,
   CardTitle,
   Field,
   FieldError,
   FieldGroup,
   FieldLabel,
   Input,
   Popover,
   PopoverContent,
   PopoverTrigger,
   Textarea,
} from '@/shared/components/ui';
import { Loading } from '@/shared/components/ui/loader-v2';
import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/shared/components/ui/select';
import { PUBLIC_URL } from '@/shared/config/url.config';
import { useProfile } from '@/shared/hooks/useProfile';
import { formatPrice } from '@/shared/lib/format-price';

import { useCartQuery } from '@/features/cart/hooks/useCart';
import { useGetDeliveries } from '@/features/delivery/hooks/useGetDeliveries';
import { useCheckout } from '@/features/order/hooks/useCheckout';
import { useGetPayments } from '@/features/payment/hooks/useGetPayments';

const checkoutSchema = z.object({
   firstName: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
   lastName: z.string().optional(),
   phone: z.string().min(5, 'Введите корректный номер телефона'),
   email: z.email({ message: 'Некорректный формат Email' }),
   address: z.string().optional(),
   comment: z.string().optional(),
   deliveryMethodId: z.string().min(1, 'Выберите способ доставки'),
   paymentMethodId: z.string().min(1, 'Выберите способ оплаты'),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export function Order() {
   const { user, isLoading: isProfileLoading } = useProfile();

   const { data: cartItems, isLoading: isCartLoading } = useCartQuery();

   const { deliveries, isLoading: isDeliveriesLoading } = useGetDeliveries();
   const { payments, isLoading: isPaymentsLoading } = useGetPayments();

   const { createPayment, isLoadingCreate } = useCheckout();

   const form = useForm<CheckoutFormValues>({
      resolver: zodResolver(checkoutSchema),
      defaultValues: {
         firstName: '',
         lastName: '',
         phone: '',
         email: user?.email || '',
         address: '',
         comment: '',
         deliveryMethodId: '',
         paymentMethodId: '',
      },
   });

   const watchedDeliveryId = useWatch({
      control: form.control,
      name: 'deliveryMethodId',
   });

   const watchedPaymentId = useWatch({
      control: form.control,
      name: 'paymentMethodId',
   });

   const selectedDeliveryMethod = deliveries?.find(
      (d) => d.id === watchedDeliveryId,
   );
   const selectedPaymentMethod = payments?.find(
      (p) => p.id === watchedPaymentId,
   );

   // Автоподставление данных, когда профиль загрузился (для SPA переходов)
   useEffect(() => {
      if (user) {
         form.reset({
            firstName: '',
            lastName: '',
            phone: '',
            email: user.email || '',
            address: '',
            comment: '',
            deliveryMethodId: form.getValues('deliveryMethodId'),
            paymentMethodId: form.getValues('paymentMethodId'),
         });
      }
   }, [user, form]);

   // Рассчитываем итоговую стоимость на основе реактивного кэша React Query
   const totalPrice = cartItems?.reduce((acc, item) => {
      const base = Number(item.variant.price);
      const finalPrice = base - (base * item.variant.discount) / 100;
      return acc + finalPrice * item.quantity;
   }, 0);

   // Сумма ДО скидок (чистая базовая стоимость)
   const baseTotalPrice = cartItems?.reduce((acc, item) => {
      return acc + Number(item.variant.price) * item.quantity;
   }, 0);

   // Общая сумма чистой экономии
   const totalDiscount = (baseTotalPrice ?? 0) - (totalPrice ?? 0);

   const onSubmit = (formData: CheckoutFormValues) => {
      if (!cartItems || cartItems.length === 0) return;

      createPayment({
         ...formData,
         items: cartItems.map((item) => ({
            variantId: item.variantId,
            quantity: item.quantity,
         })),
      });
   };

   const breadcrumbsData = [
      { text: 'Каталог', href: `${PUBLIC_URL.category()}` },
      { text: 'Корзина', href: `${PUBLIC_URL.cart()}` },
      { text: 'Оформление заказа' },
   ];

   if (isProfileLoading || isCartLoading)
      return (
         <div className="flex items-center justify-center p-8 text-center text-gray-500">
            <Loading />
         </div>
      );

   if (!cartItems || cartItems.length === 0) {
      return (
         <>
            <Breadcrumbs items={breadcrumbsData} />
            <div className="flex items-center justify-center p-8 text-center text-gray-500">
               Ваша корзина пуста
            </div>
         </>
      );
   }

   return (
      <>
         <Breadcrumbs items={breadcrumbsData} />
         <div className="w-full mx-auto p-4">
            <h1 className="text-2xl font-bold text-red-300 mb-5 md:mb-8">
               Оформление заказа
            </h1>
            <form
               id="form-checkout"
               onSubmit={form.handleSubmit(onSubmit)}
               className="w-full"
            >
               <FieldGroup>
                  <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
                     {/* ЛЕВАЯ КОЛОНКА: Данные формы */}
                     <div className="space-y-6">
                        <Card className="border-neutral-200 shadow-sm">
                           <CardHeader>
                              <CardTitle className="text-xl font-semibold">
                                 1. Личные данные
                              </CardTitle>
                           </CardHeader>
                           <CardContent className="space-y-4">
                              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                 <Controller
                                    control={form.control}
                                    name="firstName"
                                    render={({ field, fieldState }) => (
                                       <Field data-invalid={fieldState.invalid}>
                                          <FieldLabel htmlFor="first-name">
                                             Имя *
                                          </FieldLabel>
                                          <Input
                                             id="first-name"
                                             type="text"
                                             placeholder="Введите имя"
                                             disabled={isLoadingCreate}
                                             {...field}
                                             aria-invalid={fieldState.invalid}
                                          />
                                          {fieldState.invalid && (
                                             <FieldError
                                                errors={[fieldState.error]}
                                             />
                                          )}
                                       </Field>
                                    )}
                                 />
                                 <Controller
                                    control={form.control}
                                    name="lastName"
                                    render={({ field, fieldState }) => (
                                       <Field data-invalid={fieldState.invalid}>
                                          <FieldLabel htmlFor="last-name">
                                             Фамилия
                                          </FieldLabel>
                                          <Input
                                             id="last-name"
                                             type="text"
                                             placeholder="Введите фамилию"
                                             disabled={isLoadingCreate}
                                             {...field}
                                             aria-invalid={fieldState.invalid}
                                          />
                                          {fieldState.invalid && (
                                             <FieldError
                                                errors={[fieldState.error]}
                                             />
                                          )}
                                       </Field>
                                    )}
                                 />
                              </div>

                              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                 <Controller
                                    control={form.control}
                                    name="phone"
                                    render={({ field, fieldState }) => (
                                       <Field data-invalid={fieldState.invalid}>
                                          <FieldLabel htmlFor="phone">
                                             Телефон *
                                          </FieldLabel>
                                          <Input
                                             id="phone"
                                             type="text"
                                             placeholder="Введите телефон"
                                             disabled={isLoadingCreate}
                                             {...field}
                                             aria-invalid={fieldState.invalid}
                                          />
                                          {fieldState.invalid && (
                                             <FieldError
                                                errors={[fieldState.error]}
                                             />
                                          )}
                                       </Field>
                                    )}
                                 />
                                 <Controller
                                    control={form.control}
                                    name="email"
                                    render={({ field, fieldState }) => (
                                       <Field data-invalid={fieldState.invalid}>
                                          <FieldLabel htmlFor="email">
                                             email *
                                          </FieldLabel>
                                          <Input
                                             id="email"
                                             type="email"
                                             placeholder="Введите email"
                                             disabled={isLoadingCreate}
                                             {...field}
                                             aria-invalid={fieldState.invalid}
                                          />
                                          {fieldState.invalid && (
                                             <FieldError
                                                errors={[fieldState.error]}
                                             />
                                          )}
                                       </Field>
                                    )}
                                 />
                              </div>
                           </CardContent>
                        </Card>

                        <Card className="border-neutral-200 shadow-sm">
                           <CardHeader>
                              <CardTitle className="text-xl font-semibold">
                                 2. Доставка и оплата
                              </CardTitle>
                           </CardHeader>
                           <CardContent className="space-y-4">
                              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                 <div className="flex flex-col space-y-2">
                                    <Controller
                                       control={form.control}
                                       name="deliveryMethodId"
                                       rules={{
                                          required: 'Выберите способ доставки',
                                       }}
                                       render={({ field, fieldState }) => (
                                          <Field
                                             data-invalid={fieldState.invalid}
                                          >
                                             <div className="flex items-center justify-between">
                                                <FieldLabel>
                                                   Способ доставки *
                                                </FieldLabel>
                                                {selectedDeliveryMethod &&
                                                   (selectedDeliveryMethod.description ||
                                                      selectedDeliveryMethod.instruction) && (
                                                      <Popover>
                                                         <PopoverTrigger
                                                            asChild
                                                         >
                                                            <button
                                                               type="button"
                                                               className="text-xs underline underline-offset-2 transition-colors"
                                                            >
                                                               Инструкция
                                                            </button>
                                                         </PopoverTrigger>
                                                         <PopoverContent
                                                            side="top"
                                                            align="end"
                                                            className="w-72 backdrop-blur border border-neutral-200 shadow-xl rounded-xl z-50 text-xs text-neutral-600 space-y-2 animate-in slide-in-from-bottom-1 duration-200"
                                                         >
                                                            {selectedDeliveryMethod.description && (
                                                               <p className="font-semibold">
                                                                  {
                                                                     selectedDeliveryMethod.description
                                                                  }
                                                               </p>
                                                            )}
                                                            {selectedDeliveryMethod.instruction && (
                                                               <p className="border-t border-neutral-100 pt-2">
                                                                  {
                                                                     selectedDeliveryMethod.instruction
                                                                  }
                                                               </p>
                                                            )}
                                                         </PopoverContent>
                                                      </Popover>
                                                   )}
                                             </div>

                                             <Select
                                                disabled={
                                                   isLoadingCreate ||
                                                   isDeliveriesLoading
                                                }
                                                onValueChange={field.onChange}
                                                value={field.value}
                                             >
                                                <SelectTrigger id="deliveriesId">
                                                   <SelectValue placeholder="Способ доставки" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                   <SelectGroup>
                                                      {deliveries?.map(
                                                         (method) => (
                                                            <SelectItem
                                                               key={method.id}
                                                               value={method.id}
                                                            >
                                                               {method.name}
                                                            </SelectItem>
                                                         ),
                                                      )}
                                                   </SelectGroup>
                                                </SelectContent>
                                             </Select>
                                          </Field>
                                       )}
                                    />
                                 </div>

                                 <div className="flex flex-col space-y-2">
                                    <Controller
                                       control={form.control}
                                       name="paymentMethodId"
                                       rules={{
                                          required: 'Выберите способ оплаты',
                                       }}
                                       render={({ field, fieldState }) => (
                                          <Field
                                             data-invalid={fieldState.invalid}
                                          >
                                             <div className="flex items-center justify-between">
                                                <FieldLabel>
                                                   Способ оплаты *
                                                </FieldLabel>
                                                {selectedPaymentMethod &&
                                                   (selectedPaymentMethod.description ||
                                                      selectedPaymentMethod.instruction) && (
                                                      <Popover>
                                                         <PopoverTrigger
                                                            asChild
                                                         >
                                                            <button
                                                               type="button"
                                                               className="text-xs underline underline-offset-2 transition-colors"
                                                            >
                                                               Инструкция
                                                            </button>
                                                         </PopoverTrigger>
                                                         <PopoverContent
                                                            side="top"
                                                            align="end"
                                                            className="w-72 p-4 backdrop-blur border border-neutral-200 shadow-xl rounded-xl z-50 text-xs text-neutral-600 space-y-2 animate-in slide-in-from-bottom-1 duration-200"
                                                         >
                                                            {selectedPaymentMethod.description && (
                                                               <p className="font-semibold">
                                                                  {
                                                                     selectedPaymentMethod.description
                                                                  }
                                                               </p>
                                                            )}
                                                            {selectedPaymentMethod.instruction && (
                                                               <p className="border-t border-neutral-100 pt-2 mt-2 italic">
                                                                  {
                                                                     selectedPaymentMethod.instruction
                                                                  }
                                                               </p>
                                                            )}
                                                         </PopoverContent>
                                                      </Popover>
                                                   )}
                                             </div>

                                             <Select
                                                disabled={
                                                   isLoadingCreate ||
                                                   isPaymentsLoading
                                                }
                                                onValueChange={field.onChange}
                                                value={field.value}
                                             >
                                                <SelectTrigger>
                                                   <SelectValue placeholder="Способ оплаты" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                   <SelectGroup>
                                                      {payments?.map(
                                                         (method) => (
                                                            <SelectItem
                                                               key={method.id}
                                                               value={method.id}
                                                            >
                                                               {method.name}
                                                            </SelectItem>
                                                         ),
                                                      )}
                                                   </SelectGroup>
                                                </SelectContent>
                                             </Select>
                                          </Field>
                                       )}
                                    />
                                 </div>
                              </div>
                              <Controller
                                 control={form.control}
                                 name="address"
                                 render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                       <FieldLabel htmlFor="address">
                                          Адрес доставки
                                       </FieldLabel>
                                       <Input
                                          id="address"
                                          type="text"
                                          placeholder="Введите адрес"
                                          disabled={isLoadingCreate}
                                          {...field}
                                          aria-invalid={fieldState.invalid}
                                       />
                                       {fieldState.invalid && (
                                          <FieldError
                                             errors={[fieldState.error]}
                                          />
                                       )}
                                    </Field>
                                 )}
                              />
                              <Controller
                                 control={form.control}
                                 name="comment"
                                 render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                       <FieldLabel htmlFor="comment">
                                          Комментарий к заказу
                                       </FieldLabel>
                                       <Textarea
                                          id="comment"
                                          placeholder="Введите адрес"
                                          disabled={isLoadingCreate}
                                          {...field}
                                       />
                                       {fieldState.invalid && (
                                          <FieldError
                                             errors={[fieldState.error]}
                                          />
                                       )}
                                    </Field>
                                 )}
                              />
                           </CardContent>
                        </Card>
                     </div>
                     {/* ПРАВАЯ КОЛОНКА: Сводка по товарам */}
                     <div className="">
                        <Card className="sticky top-6 border shadow-sm">
                           <CardHeader>
                              <CardTitle className="text-xl font-semibold">
                                 Ваш заказ
                              </CardTitle>
                           </CardHeader>
                           <CardContent className="space-y-6">
                              <div className="space-y-2 text-sm">
                                 <div className="flex justify-between">
                                    <span>
                                       Товары (
                                       {cartItems.reduce(
                                          (sum, i) => sum + i.quantity,
                                          0,
                                       )}{' '}
                                       шт.):
                                    </span>
                                    <span className="font-medium">
                                       {formatPrice(baseTotalPrice || 0)}
                                    </span>
                                 </div>

                                 {/* Показываем строчку скидки только если она реально есть */}
                                 {totalDiscount > 0 && (
                                    <div className="flex justify-between">
                                       <span>Общая скидка:</span>
                                       <span className="font-medium">
                                          - {formatPrice(totalDiscount)}
                                       </span>
                                    </div>
                                 )}
                              </div>
                              <div className="flex justify-between items-baseline pt-2 border-t">
                                 <span className="text-base font-medium mr-2">
                                    Итого к оплате:
                                 </span>
                                 <span className="text-2xl font-bold">
                                    {formatPrice(totalPrice || 0)}
                                 </span>
                              </div>

                              <Button
                                 type="submit"
                                 className="w-full py-3 rounded-md font-semibold text-sm transition"
                                 disabled={isLoadingCreate}
                              >
                                 {isLoadingCreate
                                    ? 'Оформление...'
                                    : 'Оформить заказ'}
                              </Button>
                           </CardContent>
                        </Card>
                     </div>
                  </div>
               </FieldGroup>
            </form>
         </div>
      </>
   );
}
