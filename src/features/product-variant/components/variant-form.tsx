'use client';

import { useCreateVariant } from '../hooks/useCreateVariant';
import { useDeleteVariant } from '../hooks/useDeleteVariant';
import { useUpdateVariant } from '../hooks/useUpdateVariant';
import {
   IProductVariant,
   IProductVariantInput,
} from '../types/product-variant.interface';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
   Controller,
   SubmitHandler,
   useFieldArray,
   useForm,
} from 'react-hook-form';

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
import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/shared/components/ui/select';

import { IAttribute } from '@/features/attribute/types/attribute.interface';
import { IColor } from '@/features/color/types/color.interface';
import { IProduct } from '@/features/product/types/product.interface';

interface VariantFormProps {
   variant?: IProductVariant;
   colors: IColor[];
   attributes: IAttribute[];
}

type TVariantFormValues = Omit<IProductVariantInput, 'price' | 'product'> & {
   price: number;
   product?: IProduct;
};

export function VariantForm({ variant, colors, attributes }: VariantFormProps) {
   const router = useRouter();

   const { createVariant, isLoadingCreate } = useCreateVariant();
   const { updateVariant, isLoadingUpdate } = useUpdateVariant();
   const { deleteVariant, isLoadingDelete } = useDeleteVariant();

   const title = variant ? 'Изменить вариант' : 'Добавить вариант';
   const description = variant
      ? `Редактирование вариации с артикулом ${variant.sku}`
      : 'Добавление новой вариации для товара';
   const action = variant ? 'Сохранить' : 'Создать';

   const isPending = isLoadingCreate || isLoadingUpdate || isLoadingDelete;

   const form = useForm<TVariantFormValues>({
      mode: 'onChange',
      values: {
         product: variant?.product,
         sku: variant?.sku || '',
         // Цена переводится в число для корректной валидации и отправки в DTO
         price: variant?.price ? Number(variant.price) : 0,
         stock: variant?.stock ?? 0,
         discount: variant?.discount ?? 0,
         colorId: variant?.colorId || null,
         // Мапим существующие свойства, исключая лишние поля для соответствия инпуту
         properties:
            variant?.properties?.map((p) => ({
               attributeId: p.attributeId,
               value: p.value,
            })) || [],
      },
   });

   // Управление динамическим списком характеристик
   const { fields, append, remove } = useFieldArray({
      control: form.control,
      name: 'properties',
   });

   const onSubmit: SubmitHandler<TVariantFormValues> = (data) => {
      // Преобразуем пустую строку цвета в null для корректной работы Prisma
      const payload = {
         ...data,
         colorId:
            data.colorId === 'none' || !data.colorId ? null : data.colorId,
      };

      if (variant) {
         updateVariant(payload as unknown as IProductVariantInput);
      } else {
         createVariant(payload as unknown as IProductVariantInput);
      }
   };

   return (
      <div className="p-6">
         <div className="flex items-center justify-between mb-6">
            <Heading title={title} description={description} />
            {variant && (
               <ConfirmModal handleClick={() => deleteVariant()}>
                  <Button size="icon" disabled={isPending} type="button">
                     <Trash className="size-4" />
                  </Button>
               </ConfirmModal>
            )}
         </div>

         <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 max-w-3xl"
         >
            <FieldGroup>
               {/* Основные параметры: SKU и Цена */}
               <div className="grid sm:grid-cols-2 gap-4">
                  <Controller
                     control={form.control}
                     name="sku"
                     rules={{ required: 'Обязательное поле' }}
                     render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                           <FieldLabel htmlFor="variant-sku">
                              Артикул (SKU)
                           </FieldLabel>
                           <Input
                              id="variant-sku"
                              placeholder="Например: TSHIRT-BLK-XL"
                              disabled={isPending}
                              {...field}
                           />
                           {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                           )}
                        </Field>
                     )}
                  />

                  <Controller
                     control={form.control}
                     name="price"
                     rules={{
                        required: 'Обязательное поле',
                        min: {
                           value: 0.01,
                           message: 'Цена должна быть больше нуля',
                        },
                     }}
                     render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                           <FieldLabel htmlFor="variant-price">
                              Цена (₽)
                           </FieldLabel>
                           <Input
                              id="variant-price"
                              type="number"
                              step="0.01"
                              placeholder="0.00"
                              disabled={isPending}
                              onChange={(e) =>
                                 field.onChange(Number(e.target.value))
                              }
                              value={field.value || ''}
                           />
                           {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                           )}
                        </Field>
                     )}
                  />
               </div>

               {/* Склад и Скидки */}
               <div className="grid sm:grid-cols-2 gap-4">
                  <Controller
                     control={form.control}
                     name="stock"
                     rules={{
                        min: {
                           value: 0,
                           message: 'Не может быть отрицательным',
                        },
                     }}
                     render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                           <FieldLabel htmlFor="variant-stock">
                              Количество на складе
                           </FieldLabel>
                           <Input
                              id="variant-stock"
                              type="number"
                              disabled={isPending}
                              onChange={(e) =>
                                 field.onChange(Number(e.target.value))
                              }
                              value={field.value}
                           />
                           {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                           )}
                        </Field>
                     )}
                  />

                  <Controller
                     control={form.control}
                     name="discount"
                     rules={{
                        min: { value: 0, message: 'Минимум 0%' },
                        max: { value: 100, message: 'Максимум 100%' },
                     }}
                     render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                           <FieldLabel htmlFor="variant-discount">
                              Скидка (%)
                           </FieldLabel>
                           <Input
                              id="variant-discount"
                              type="number"
                              disabled={isPending}
                              onChange={(e) =>
                                 field.onChange(Number(e.target.value))
                              }
                              value={field.value}
                           />
                           {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                           )}
                        </Field>
                     )}
                  />
               </div>

               {/* Выбор цвета из существующих */}
               <div className="grid sm:grid-cols-2 gap-4">
                  <Controller
                     control={form.control}
                     name="colorId"
                     render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                           <FieldLabel htmlFor="variant-color">
                              Цвет товара
                           </FieldLabel>
                           <Select
                              disabled={isPending}
                              onValueChange={field.onChange}
                              value={field.value || 'none'}
                           >
                              <SelectTrigger id="variant-color">
                                 <SelectValue placeholder="Выберите цвет (опционально)" />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectGroup>
                                    <SelectItem value="none">
                                       Без цвета
                                    </SelectItem>
                                    {colors.map((color) => (
                                       <SelectItem
                                          key={color.id}
                                          value={color.id}
                                       >
                                          <div className="flex items-center gap-x-2">
                                             <div
                                                className="size-4 rounded-full border border-gray-300"
                                                style={{
                                                   backgroundColor: color.value,
                                                }}
                                             />
                                             <span>{color.name}</span>
                                          </div>
                                       </SelectItem>
                                    ))}
                                 </SelectGroup>
                              </SelectContent>
                           </Select>
                        </Field>
                     )}
                  />
               </div>

               {/* Динамический блок добавления характеристик (VariantProperty) */}
               <div className="border-t pt-6 mt-4">
                  <div className="flex justify-between items-center mb-4">
                     <div>
                        <h3 className="text-sm font-semibold">
                           Дополнительные характеристики
                        </h3>
                     </div>
                     <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={isPending}
                        onClick={() => append({ attributeId: '', value: '' })}
                        className="flex items-center gap-x-1"
                     >
                        Добавить
                     </Button>
                  </div>
                  <div>
                     {fields.map((item, index) => (
                        <div
                           key={item.id}
                           className="flex gap-4 items-start p-4 rounded-lg border mb-3"
                        >
                           <div className="flex-1">
                              <Controller
                                 control={form.control}
                                 name={`properties.${index}.attributeId`}
                                 rules={{ required: 'Выберите тип' }}
                                 render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                       <Select
                                          disabled={isPending}
                                          onValueChange={field.onChange}
                                          value={field.value}
                                       >
                                          <SelectTrigger>
                                             <SelectValue placeholder="Характеристика" />
                                          </SelectTrigger>
                                          <SelectContent>
                                             <SelectGroup>
                                                {attributes.map((attr) => (
                                                   <SelectItem
                                                      key={attr.id}
                                                      value={attr.id}
                                                   >
                                                      {attr.name}
                                                   </SelectItem>
                                                ))}
                                             </SelectGroup>
                                          </SelectContent>
                                       </Select>
                                    </Field>
                                 )}
                              />
                           </div>

                           <div className="flex-1">
                              <Controller
                                 control={form.control}
                                 name={`properties.${index}.value`}
                                 rules={{ required: 'Введите значение' }}
                                 render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                       <FieldLabel
                                          htmlFor={`prop-val-${index}`}
                                          className="sr-only"
                                       >
                                          Значение характеристики
                                       </FieldLabel>
                                       <Input
                                          placeholder="Значение"
                                          disabled={isPending}
                                          {...field}
                                       />
                                    </Field>
                                 )}
                              />
                           </div>

                           <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              disabled={isPending}
                              onClick={() => remove(index)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 mt-1"
                           >
                              <Trash className="size-4" />
                           </Button>
                        </div>
                     ))}
                  </div>
               </div>
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
            </FieldGroup>
         </form>
      </div>
   );
}
