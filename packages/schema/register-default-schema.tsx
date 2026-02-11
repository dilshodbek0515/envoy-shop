import z from 'zod'

export const registerDefaultSchema = z
  .object({
    role: z.enum(['buyer', 'seller']),
    email: z.string().email('Email noto‘g‘ri').optional().or(z.literal('')),
    password: z.string().min(8, 'Parol kamida 8 ta bo‘lsin'),
    confirm_password: z.string()
  })
  .refine(d => d.password === d.confirm_password, {
    message: 'Parollar mos emas',
    path: ['confirm_password']
  })
export type RegisterDefaultFormData = z.infer<typeof registerDefaultSchema>
