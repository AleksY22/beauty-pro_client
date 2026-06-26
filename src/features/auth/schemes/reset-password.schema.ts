import z from 'zod';

export const ResetPasswordSchema = z.object({
   email: z.email({
      message: 'Некорректный формат email',
   }),
});

export type TypeResetPasswordSchema = z.infer<typeof ResetPasswordSchema>;
