import z from 'zod'

export const changePasswordSchema = z
  .object({
    firstPassword: z
      .string()
      .regex(/[A-Z]/, { message: 'Kamida 1 ta katta harf' })
      .regex(/[a-z]/, { message: 'Kamida 1 ta kichik harf' })
      .regex(/\d/, { message: 'Kamida 1 ta raqam' })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: 'Kamida 1 ta maxsus belgi'
      })
      .min(8, { message: "Kamida 8 ta belgi bo'lsin" }),
    secondPassword: z.string()
  })
  .refine(data => data.firstPassword === data.secondPassword, {
    message: 'Parollar mos emas',
    path: ['secondPassword']
  })
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>
