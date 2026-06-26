import { z } from 'zod';

export const SettingsSchema = z.object({
   name: z.string().min(2, {
      message: 'Введите имя',
   }),
   email: z.email({
      message: 'Некорректный формат email',
   }),
   isTwoFactorEnabled: z.boolean(),
});

export type TypeSettingsSchema = z.infer<typeof SettingsSchema>;
