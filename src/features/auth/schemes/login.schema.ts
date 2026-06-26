import { z } from 'zod';

export const LoginSchema = z.object({
   email: z.email({
      message: 'Некорректный формат email',
   }),
   password: z.string().min(6, {
      message: 'Пароль минимум 6 символов',
   }),
   code: z.optional(z.string()),
});

export type TypeLoginSchema = z.infer<typeof LoginSchema>;
