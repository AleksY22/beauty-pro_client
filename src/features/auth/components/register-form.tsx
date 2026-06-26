'use client';

import { useRegisterMutation } from '../hooks';
import { RegisterSchema, TypeRegisterSchema } from '../schemes';
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

export function RegisterForm() {
   //интеграция recaptcha
   const { theme } = useTheme();
   const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);

   const form = useForm<TypeRegisterSchema>({
      //интеграция zod в react-hook-form
      resolver: zodResolver(RegisterSchema),
      defaultValues: {
         name: '',
         email: '',
         password: '',
         passwordRepeat: '',
      },
   });

   const { register, isLoadingRegister } = useRegisterMutation();

   const onSubmit = (values: TypeRegisterSchema) => {
      if (recaptchaValue) {
         register({ values, recaptcha: recaptchaValue });
      } else {
         toast.error('Пожалуйста, завершите reCAPTCHA');
      }
   };

   return (
      <AuthWrapper
         heading="Регистрация"
         description="Введите имя, email и пароль"
         backButtonLabel="Уже есть аккаунт? Войти"
         backButtonHref={PUBLIC_URL.login()}
         isShowSocial
      >
         <form
            id="form-register"
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-2"
         >
            <FieldGroup>
               <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                     <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-register-name">
                           Имя
                        </FieldLabel>
                        <Input
                           {...field}
                           id="form-register-name"
                           aria-invalid={fieldState.invalid}
                           placeholder="Введите имя"
                           disabled={isLoadingRegister}
                        />
                        {fieldState.invalid && (
                           <FieldError errors={[fieldState.error]} />
                        )}
                     </Field>
                  )}
               />

               <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                     <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-register-email">
                           Email
                        </FieldLabel>
                        <Input
                           {...field}
                           id="form-register-email"
                           type="email"
                           aria-invalid={fieldState.invalid}
                           placeholder="example@email.com"
                           disabled={isLoadingRegister}
                        />
                        {fieldState.invalid && (
                           <FieldError errors={[fieldState.error]} />
                        )}
                     </Field>
                  )}
               />

               <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                     <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-register-password">
                           Пароль
                        </FieldLabel>
                        <Input
                           {...field}
                           id="form-register-password"
                           type="password"
                           aria-invalid={fieldState.invalid}
                           placeholder="Введите пароль"
                           disabled={isLoadingRegister}
                        />
                        {fieldState.invalid && (
                           <FieldError errors={[fieldState.error]} />
                        )}
                     </Field>
                  )}
               />

               <Controller
                  name="passwordRepeat"
                  control={form.control}
                  render={({ field, fieldState }) => (
                     <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-register-passwordRepeat">
                           Подтверждение пароля
                        </FieldLabel>
                        <Input
                           {...field}
                           id="form-register-passwordRepeat"
                           type="password"
                           aria-invalid={fieldState.invalid}
                           placeholder="Повторите пароль"
                           disabled={isLoadingRegister}
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
            <Button type="submit" disabled={isLoadingRegister}>
               Создать аккаунт
            </Button>
         </form>
      </AuthWrapper>
   );
}
