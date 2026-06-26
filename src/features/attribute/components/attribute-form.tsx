'use client';

import { useCreateAttribute } from '../hooks/useCreateAttributes';
import { useDeleteAttribute } from '../hooks/useDeleteAttribute';
import { useUpdateAttribute } from '../hooks/useUpdateAttribute';
import { IAttribute, IAttributeInput } from '../types/attribute.interface';
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

interface AttributeFormProps {
   attribute?: IAttribute;
}

export function AttributeForm({ attribute }: AttributeFormProps) {
   const router = useRouter();

   const { createAttribute, isLoadingCreate } = useCreateAttribute();
   const { updateAttribute, isLoadingUpdate } = useUpdateAttribute();
   const { deleteAttribute, isLoadingDelete } = useDeleteAttribute();

   const title = attribute ? 'Изменить данные' : 'Создать характеристику';
   const description = attribute
      ? 'Изменить данные о характеристике'
      : 'Добавить новую характеристику';
   const action = attribute ? 'Сохранить' : 'Создать';

   const isPending = isLoadingUpdate || isLoadingCreate || isLoadingDelete;

   const form = useForm<IAttributeInput>({
      mode: 'onChange',
      values: {
         name: attribute?.name || '',
      },
   });

   const onSubmit: SubmitHandler<IAttributeInput> = (data) => {
      if (attribute) updateAttribute(data);
      else createAttribute(data);
   };

   return (
      <div className="p-6">
         <div className="flex items-center justify-between">
            <Heading title={title} description={description} />
            {attribute && (
               <ConfirmModal handleClick={() => deleteAttribute()}>
                  <Button size="icon" disabled={isPending}>
                     <Trash className="size-4" />
                  </Button>
               </ConfirmModal>
            )}
         </div>
         <form
            id="form-attribute"
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
                           <FieldLabel htmlFor="attribute-name">
                              Название характеристики
                           </FieldLabel>
                           <Input
                              id="attribute-name"
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
