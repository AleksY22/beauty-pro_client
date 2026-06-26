'use client';

import { useNewPasswordMutation } from '../hooks';
import { NewPasswordSchema, TypeNewPasswordSchema } from '../schemes';
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

export function NewPasswordForm() {
   //интеграция recaptcha
   const { theme } = useTheme();
   const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);

   const form = useForm<TypeNewPasswordSchema>({
      //интеграция zod в react-hook-form
      resolver: zodResolver(NewPasswordSchema),
      defaultValues: {
         password: '',
      },
   });

   const { newPassword, isLoadingNewPassword } = useNewPasswordMutation();

   const onSubmit = (values: TypeNewPasswordSchema) => {
      if (recaptchaValue) {
         newPassword({ values, recaptcha: recaptchaValue });
      } else {
         toast.error('Пожалуйста, завершите reCAPTCHA');
      }
   };

   return (
      <AuthWrapper
         heading="Новый пароль"
         description="Введите новый пароль"
         backButtonLabel="Войти в аккаунт"
         backButtonHref={PUBLIC_URL.login()}
      >
         <form
            id="form-new-password"
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-2"
         >
            <FieldGroup>
               <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                     <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-new-password">
                           Пароль
                        </FieldLabel>
                        <Input
                           {...field}
                           id="form-new-password"
                           type="password"
                           aria-invalid={fieldState.invalid}
                           placeholder="Введите пароль"
                           disabled={isLoadingNewPassword}
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
            <Button type="submit" disabled={isLoadingNewPassword}>
               Продолжить
            </Button>
         </form>
      </AuthWrapper>
   );
}
