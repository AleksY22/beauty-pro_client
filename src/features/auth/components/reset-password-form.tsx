'use client';

import { useResetPasswordMutation } from '../hooks';
import { ResetPasswordSchema, TypeResetPasswordSchema } from '../schemes';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import {
   Button,
   Field,
   FieldError,
   FieldGroup,
   FieldLabel,
   Input,
} from '@/shared/components/ui';
import { PUBLIC_URL } from '@/shared/config/url.config';

import { AuthWrapper } from './auth-wrapper';

export function ResetPasswordForm() {
   //интеграция recaptcha
   const { theme } = useTheme();
   const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);

   const form = useForm<TypeResetPasswordSchema>({
      //интеграция zod в react-hook-form
      resolver: zodResolver(ResetPasswordSchema),
      defaultValues: {
         email: '',
      },
   });

   const { reset, isLoadingReset } = useResetPasswordMutation();

   const onSubmit = (values: TypeResetPasswordSchema) => {
      if (recaptchaValue) {
         reset({ values, recaptcha: recaptchaValue });
      } else {
         toast.error('Пожалуйста, завершите reCAPTCHA');
      }
   };

   return (
      <AuthWrapper
         heading="Сброс пароля"
         description="Для сброса пароля введите ваш email"
         backButtonLabel="Войти в аккаунт"
         backButtonHref={PUBLIC_URL.login()}
      >
         <form
            id="form-reset-password"
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-2"
         >
            <FieldGroup>
               <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                     <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-reset-email">
                           Email
                        </FieldLabel>
                        <Input
                           {...field}
                           id="form-reset-email"
                           type="email"
                           aria-invalid={fieldState.invalid}
                           placeholder="example@email.com"
                           disabled={isLoadingReset}
                        />
                        {fieldState.invalid && (
                           <FieldError errors={[fieldState.error]} />
                        )}
                     </Field>
                  )}
               />
            </FieldGroup>
            <div className="flex justify-center">
               <ReCAPTCHA
                  sitekey={process.env.GOOGLE_RECAPTCHA_SITE_KEY as string}
                  onChange={setRecaptchaValue}
                  theme={theme === 'light' ? 'light' : 'dark'}
               />
            </div>
            <Button type="submit" disabled={isLoadingReset}>
               Сбросить пароль
            </Button>
         </form>
      </AuthWrapper>
   );
}
