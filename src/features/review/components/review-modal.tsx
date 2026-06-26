'use client';

import { useCreateReview } from '../hooks/useCreateReview';
import { IReviewInput } from '../types/review.interface';
import { PropsWithChildren, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Rating } from 'react-simple-star-rating';

import {
   Button,
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
   Field,
   FieldError,
   FieldGroup,
   FieldLabel,
} from '@/shared/components/ui';
import { Textarea } from '@/shared/components/ui/textarea';

export function ReviewModal({ children }: PropsWithChildren) {
   const [isOpen, setIsOpen] = useState(false);

   const form = useForm<IReviewInput>({
      mode: 'onChange',
   });

   const { createReview, isLoadingCreate } = useCreateReview();

   const onSubmit: SubmitHandler<IReviewInput> = (data) => {
      createReview(data);
      form.reset();
      setIsOpen(false);
   };

   return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
         <DialogTrigger>{children}</DialogTrigger>
         <DialogContent
            style={{
               width: 'calc(100% - 2rem)',
               maxWidth: '750px',
            }}
         >
            <DialogHeader>
               <DialogTitle>Создание отзыва</DialogTitle>
               <DialogDescription>
                  Для создания отзыва необходимо указать рейтинг и текст
               </DialogDescription>
            </DialogHeader>
            <form
               id="form-review"
               onSubmit={form.handleSubmit(onSubmit)}
               className="space-y-4"
            >
               <FieldGroup>
                  <Controller
                     control={form.control}
                     name="rating"
                     rules={{ required: 'Обязательное поле' }}
                     render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                           <Rating
                              onClick={field.onChange}
                              initialValue={field.value}
                              SVGstyle={{ display: 'inline-block' }}
                              size={20}
                              transition
                           />
                           {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                           )}
                        </Field>
                     )}
                  />
                  <Controller
                     control={form.control}
                     name="text"
                     rules={{
                        required: 'Обязательное поле',
                     }}
                     render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                           <FieldLabel htmlFor="form-review">Текст</FieldLabel>
                           <Textarea
                              {...field}
                              placeholder="Текст отзыва"
                              disabled={isLoadingCreate}
                           />
                           {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                           )}
                        </Field>
                     )}
                  />
                  <div className="flex justify-end">
                     <Button
                        type="submit"
                        disabled={isLoadingCreate}
                        className="flex items-center gap-x-4"
                     >
                        Добавить
                     </Button>
                  </div>
               </FieldGroup>
            </form>
         </DialogContent>
      </Dialog>
   );
}
