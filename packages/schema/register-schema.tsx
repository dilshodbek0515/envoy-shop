import z from 'zod'

export const registerSchema = z.object({
  phone: z.string().regex(/^\d{9}$/, "Telefon raqamni to'liq kiriting")
})
export type RegisterFormData = z.infer<typeof registerSchema>
