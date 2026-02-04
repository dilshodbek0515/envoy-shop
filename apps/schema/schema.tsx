import { z } from 'zod'

// ================ LOGIN SCHEMA ================

export const loginSchema = z.object({
  phone: z
    .string()
    .length(9, "Telefon raqam 9 ta bo'lishi kerak")
    .regex(/^\d+$/, 'Faqat raqamlar kiriting'),

  password: z.string().length(8, "Parol kamida 8 ta bo'lishi kerak")
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

// Yuridik schema
export const legalSchema = z
  .object({
    firstName: z.string().min(2, "Ism kamida 2 ta belgi bo'lsin"),
    lastName: z.string().min(2, "Familiya kamida 2 ta belgi bo'lsin"),
    stir: z
      .string()
      .length(9, "STIR 9 ta raqam bo'lsin")
      .regex(/^\d+$/, 'Faqat raqamlar kiriting'),
    activityType: z.string().min(1, 'Faoliyat turini tanlang'),
    companyName: z.string().min(3, "Korxona nomi kamida 3 ta belgi bo'lsin"),
    legalAddress: z.string().min(5, "Yuridik manzil kamida 5 ta belgi bo'lsin"),
    bankDetails: z
      .string()
      .min(20, "Bank rekvizitlari kamida 20 ta belgi bo'lsin"),
    phoneNumber: z
      .string()
      .length(9, "Telefon raqam 9 ta bo'lsin")
      .regex(/^\d+$/, 'Faqat raqamlar kiriting'),
    password: z.string().min(8, "Parol kamida 8 ta belgi bo'lsin"),
    confirmPassword: z.string().min(8, 'Parolni qayta kiriting')
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Parollar mos kelmayapti',
    path: ['confirmPassword']
  })

// Jismoniy schema
export const physicalSchema = z
  .object({
    firstNamePhysical: z.string().min(2, "Ism kamida 2 ta belgi bo'lsin"),
    lastNamePhysical: z.string().min(2, "Familiya kamida 2 ta belgi bo'lsin"),
    phoneNumberPhysical: z
      .string()
      .length(9, "Telefon raqam 9 ta bo'lsin")
      .regex(/^\d+$/, 'Faqat raqamlar kiriting'),
    emailPhysical: z.string().email("Noto'g'ri email format"),
    passwordPhysical: z.string().min(8, "Parol kamida 8 ta belgi bo'lsin"),
    confirmPasswordPhysical: z.string().min(8, 'Parolni qayta kiriting')
  })
  .refine(data => data.passwordPhysical === data.confirmPasswordPhysical, {
    message: 'Parollar mos kelmayapti',
    path: ['confirmPasswordPhysical']
  })

// TypeScript turlari
export type LegalFormData = z.infer<typeof legalSchema>
export type PhysicalFormData = z.infer<typeof physicalSchema>

// ================ REGISTER-SMS SCHEMA ================

export const registerSmsSchema = z.object({
  smsCode: z
    .string()
    .length(4, "SMS kod 4 ta bo'lishi kerak")
    .regex(/^\d+$/, 'Faqat raqamlar kiriting')
})

export type RegisterSmsFormData = z.infer<typeof registerSmsSchema>
