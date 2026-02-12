import z from 'zod'

export const loginSchema = z.object({
  phone: z
    .string()
    .length(9, "Telefon raqamni to'liq kiriting")
    .regex(/^\d+$/, 'Faqat raqamlar kiriting'),

  password: z.string().min(8, "Parolni to'liq kiriting")
})

export type LoginFormData = z.infer<typeof loginSchema>
