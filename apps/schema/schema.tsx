import { z } from 'zod'

// ================ LOGIN SCHEMA ================

export const loginSchema = z.object({
  phone: z
    .string()
    .length(9, "Telefon raqamni to'liq kiriting")
    .regex(/^\d+$/, 'Faqat raqamlar kiriting'),

  password: z.string().min(8, "Parolni to'liq kiriting")
})
export type LoginFormData = z.infer<typeof loginSchema>

// /
// /
// /
// /
// /
// /

// ================ RESET-PASSWORD SCHEMA ---> CHANGE-PASSWORD ================

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
// /
// /
// /
// /
// /
// /

// ================ REGISTER SCHEMA ================

export const registerSchema = z.object({
  phone: z.string().regex(/^\d{9}$/, "Telefon raqamni to'liq kiriting")
})
export type RegisterFormData = z.infer<typeof registerSchema>
// /
// /
// /
// /
// /
// /

// ================ REGISTER-SMS SCHEMA ================

export const smsSchema = z.object({
  smsCode: z
    .string()
    .length(4, 'SMS kodi 4 ta raqamdan iborat bo‘lishi kerak')
    .regex(/^\d{4}$/, 'Faqat raqamlar kiriting')
})
export type SmsFormData = z.infer<typeof smsSchema>

// /
// /
// /
// /
// /
// /

// ================ REGISTER-DEFAULT SCHEMA ================

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
// /
// /
// /
// /
// /
// /

// ================ REGISTER-FULL SCHEMA ================

export const sellerFullSchema = z.object({
  first_name: z.string().min(2, 'Ism kamida 2 ta harf'),
  last_name: z.string().min(2, 'Familiya kamida 2 ta harf'),
  type: z.enum(['individual', 'company']),
  company_name: z.string().min(2, 'Korxona nomi majburiy'),
  inn: z.string().min(3, 'INN majburiy'),
  company_type: z.string().min(2, 'Faoliyat turi majburiy'),
  address: z.string().min(3, 'Manzil majburiy')
})

export type SellerFullFormData = z.infer<typeof sellerFullSchema>
