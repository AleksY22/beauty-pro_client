'use client';

import { useUpdateProfileMutation } from '../hooks';
import { SettingsSchema, TypeSettingsSchema } from '../schemes/settings.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';

import {
   Button,
   Card,
   CardContent,
   CardHeader,
   CardTitle,
   Field,
   FieldContent,
   FieldDescription,
   FieldError,
   FieldGroup,
   FieldLabel,
   Input,
   Loading,
   Switch,
} from '@/shared/components/ui';
import { DASHBOARD_URL } from '@/shared/config/url.config';
import { useProfile } from '@/shared/hooks/useProfile';

import { UserButton, UserButtonLoading } from './user-button';

export function SettingsForm() {
   const { user, isLoading } = useProfile();

   const form = useForm<TypeSettingsSchema>({
      resolver: zodResolver(SettingsSchema),
      values: {
         name: user?.displayName || '',
         email: user?.email || '',
         isTwoFactorEnabled: user?.isTwoFactorEnabled || false,
      },
   });

   const { update, isLoadingUpdate } = useUpdateProfileMutation();

   const onSubmit = (values: TypeSettingsSchema) => {
      update(values);
   };

   if (!user) return null;

   return (
      <Card className="w-100">
         <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Настройки профиля</CardTitle>
            {isLoading ? <UserButtonLoading /> : <UserButton user={user} />}
         </CardHeader>
         <CardContent>
            {isLoading ? (
               <Loading />
            ) : (
               <form
                  id="form-settings"
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="grid gap-2"
               >
                  <FieldGroup>
                     <Controller
                        name="name"
                        control={form.control}
                        render={({ field, fieldState }) => (
                           <Field data-invalid={fieldState.invalid}>
                              <FieldLabel htmlFor="form-settings-name">
                                 Имя
                              </FieldLabel>
                              <Input
                                 {...field}
                                 id="form-settings-name"
                                 aria-invalid={fieldState.invalid}
                                 placeholder="Введите имя"
                                 disabled={isLoadingUpdate}
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
                              <FieldLabel htmlFor="form-settings-email">
                                 Email
                              </FieldLabel>
                              <Input
                                 {...field}
                                 id="form-settings-email"
                                 type="email"
                                 aria-invalid={fieldState.invalid}
                                 placeholder="example@email.com"
                                 disabled={isLoadingUpdate}
                              />
                              {fieldState.invalid && (
                                 <FieldError errors={[fieldState.error]} />
                              )}
                           </Field>
                        )}
                     />

                     <Controller
                        name="isTwoFactorEnabled"
                        control={form.control}
                        render={({ field, fieldState }) => (
                           <Field data-invalid={fieldState.invalid}>
                              <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm space-x-2">
                                 <FieldContent>
                                    <FieldLabel htmlFor="form-settings-twoFactor">
                                       Двухфакторная аутентификация
                                    </FieldLabel>
                                    <FieldDescription>
                                       Включите двухфакторную аутентификацию для
                                       учетной записи
                                    </FieldDescription>
                                 </FieldContent>
                                 <Switch
                                    id="form-settings-twoFactor"
                                    name={field.name}
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    aria-invalid={fieldState.invalid}
                                 />
                              </div>
                           </Field>
                        )}
                     />
                  </FieldGroup>
                  <div className="flex gap-1 w-full">
                     <Link href={DASHBOARD_URL.home()} className="w-1/2">
                        <Button variant="secondary" className="w-full">
                           Отмена
                        </Button>
                     </Link>
                     <Button
                        className="w-1/2"
                        type="submit"
                        disabled={isLoadingUpdate}
                     >
                        Сохранить
                     </Button>
                  </div>
               </form>
            )}
         </CardContent>
      </Card>
   );
}
