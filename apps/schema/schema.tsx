import { z } from 'zod'

// ================ LOGIN SCHEMA ================

export const loginSchema = z.object({
  phone: z
    .string()
    .length(9, "Telefon raqam 9 ta bo'lishi kerak")
    .regex(/^\d+$/, 'Faqat raqamlar kiriting'),

  password: z.string().min(8, "Parol kamida 8 ta bo'lishi kerak")
})

export type LoginFormData = z.infer<typeof loginSchema>
// ================ RESET-PASSWORD SCHEMA ---> INTER-PHONE ================

export const interPhoneSchema = (step: number) =>
  z.object({
    phone: z
      .string()
      .length(9, "Telefon raqam 9 ta bo'lishi kerak")
      .regex(/^\d+$/, 'Faqat raqamlar kiriting'),

    smsPassword:
      step === 2
        ? z
            .string()
            .length(4, "SMS kod 4 ta bo'lishi kerak")
            .regex(/^\d+$/, 'Faqat raqamlar kiriting')
        : z.string().optional()
  })

export type InterPhoneFormData = {
  phone: string
  smsPassword?: string
}

// ================ RESET-PASSWORD SCHEMA ---> CHANGE-PASSWORD ================

export const changePasswordSchema = z
  .object({
    firstPassword: z.string().min(8, "Parol kamida 8 ta bo'lishi kerak"),
    secondPassword: z.string().min(8, "Parol kamida 8 ta bo'lishi kerak")
  })
  .refine(data => data.firstPassword === data.secondPassword, {
    message: 'Parollar mos kelmayapti',
    path: ['secondPassword']
  })

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>

// ================ REGISTER SCHEMA ================

export const registerSchema = z.object({
  phone: z.string().regex(/^\d{9}$/, "Telefon raqam 9 ta bo'lsin")
})
export type RegisterFormData = z.infer<typeof registerSchema>

// ================ REGISTER-SECOND SCHEMA ================

export const sellerProfileSchema = z.object({
  first_name: z.string().min(2, 'Ism kamida 2 ta harf'),
  last_name: z.string().min(2, 'Familiya kamida 2 ta harf'),
  type: z.string().min(1, 'Shaxs turini tanlang'),
  company_type: z.string().min(1, 'Faoliyat turini tanlang'),
  company_name: z.string().min(3, 'Korxona nomi kamida 3 ta harf'),
  inn: z.string().regex(/^\d{9,14}$/, 'INN faqat raqam'),
  address: z.string().min(5, 'Manzil kamida 5 ta harf')
})

export type SellerProfileData = z.infer<typeof sellerProfileSchema>

// ================ REGISTER-SMS SCHEMA ================

export const smsSchema = z.object({
  smsCode: z
    .string()
    .length(4, 'SMS kodi 4 ta raqamdan iborat bo‘lishi kerak')
    .regex(/^\d{4}$/, 'Faqat raqamlar kiriting')
})

export type SmsFormData = z.infer<typeof smsSchema>
