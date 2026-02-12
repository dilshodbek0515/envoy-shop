import z from 'zod'

export const smsSchema = z.object({
  smsCode: z
    .string()
    .length(4, 'SMS kodi 4 ta raqamdan iborat bo‘lishi kerak')
    .regex(/^\d{4}$/, 'Faqat raqamlar kiriting')
})
export type SmsFormData = z.infer<typeof smsSchema>
