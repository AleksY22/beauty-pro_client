import { z } from 'zod';

export const RegisterSchema = z
   .object({
      name: z.string().min(2, {
         message: 'Введите имя',
      }),
      email: z.email({
         message: 'Некорректный формат email',
      }),
      password: z.string().min(6, {
         message: 'Пароль минимум 6 символов',
      }),
      passwordRepeat: z.string().min(6, {
         message: 'Пароль подтверждения минимум 6 символов',
      }),
   })
   .refine((data) => data.password === data.passwordRepeat, {
      message: 'Пароли не совпадают',
      path: ['passwordRepeat'],
   });

export type TypeRegisterSchema = z.infer<typeof RegisterSchema>;
