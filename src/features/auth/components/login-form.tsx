'use client';

import { useLoginMutation } from '../hooks';
import { LoginSchema, TypeLoginSchema } from '../schemes';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTheme } from 'next-themes';
import Link from 'next/link';
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

export function LoginForm() {
   //интеграция recaptcha
   const { theme } = useTheme();
   const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
   const [isShowTwoFactor, setIsShowTwoFactor] = useState(false);

   const form = useForm<TypeLoginSchema>({
      //интеграция zod в react-hook-form
      resolver: zodResolver(LoginSchema),
      defaultValues: {
         email: '',
         password: '',
      },
   });

   const { login, isLoadingLogin } = useLoginMutation(setIsShowTwoFactor);

   const onSubmit = (values: TypeLoginSchema) => {
      if (recaptchaValue) {
         login({ values, recaptcha: recaptchaValue });
      } else {
         toast.error('Пожалуйста, завершите reCAPTCHA');
      }
   };

   return (
      <AuthWrapper
         heading="Вход"
         description="Введите email и пароль"
         backButtonLabel="Нет аккауна? Зарегистрируйтесь"
         backButtonHref={PUBLIC_URL.register()}
         isShowSocial
      >
         <form
            id="form-register"
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-2"
         >
            <FieldGroup>
               {isShowTwoFactor && (
                  <Controller
                     name="code"
                     control={form.control}
                     render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                           <FieldLabel htmlFor="form-login-code">
                              Код
                           </FieldLabel>
                           <Input
                              {...field}
                              id="form-login-code"
                              aria-invalid={fieldState.invalid}
                              placeholder="Введите код"
                              disabled={isLoadingLogin}
                           />
                           {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                           )}
                        </Field>
                     )}
                  />
               )}
               <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                     <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-login-email">
                           Email
                        </FieldLabel>
                        <Input
                           {...field}
                           id="form-login-email"
                           type="email"
                           aria-invalid={fieldState.invalid}
                           placeholder="example@email.com"
                           disabled={isLoadingLogin}
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
                        <div className="flex items-center justify-between">
                           <FieldLabel htmlFor="form-login-password">
                              Пароль
                           </FieldLabel>
                           <Link
                              href={PUBLIC_URL.resetPassword()}
                              className="ml-auto inline-block text-sm underline"
                           >
                              Забыли пароль?
                           </Link>
                        </div>

                        <Input
                           {...field}
                           id="form-login-password"
                           type="password"
                           aria-invalid={fieldState.invalid}
                           placeholder="Введите пароль"
                           disabled={isLoadingLogin}
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
            <Button type="submit" disabled={isLoadingLogin}>
               Войти в аккаунт
            </Button>
         </form>
      </AuthWrapper>
   );
}
