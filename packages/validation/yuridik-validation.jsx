// import { z } from 'zod'

// export const YuridikRegisterSchema = z
//   .object({
//     ism: z
//       .string()
//       .min(2, 'Ism kamida 2 ta harfdan iborat bo‘lishi kerak')
//       .regex(
//         /^[A-Za-zÀ-ÖØ-öø-ÿʻʼ’`ʼ\- ]+$/,
//         'Ism faqat harflardan iborat bo‘lishi kerak'
//       ),

//     familiya: z
//       .string()
//       .min(2, 'Familiya kamida 2 ta harfdan iborat bo‘lishi kerak')
//       .regex(
//         /^[A-Za-zÀ-ÖØ-öø-ÿʻʼ’`ʼ\- ]+$/,
//         'Familiya faqat harflardan iborat bo‘lishi kerak'
//       ),

//     korxona: z.string().min(3, 'Korxona nomi kamida 3 ta belgi bo‘lishi kerak'),

//     stir: z.string().regex(/^\d{9}$/, 'STIR aniq 9 ta raqam bo‘lishi kerak'),

//     yuridik: z.string().min(10, 'Yuridik manzil to‘liq yozilishi majburiy'),

//     bank: z
//       .string()
//       .regex(/^\d{20}$/, 'Bank rekvizitlari aniq 20 ta raqam bo‘lishi kerak'),

//     telefon: z
//       .string()
//       .regex(
//         /^\+998\d{9}$/,
//         'Telefon raqam +998 bilan boshlanib 9 xonali bo‘lishi kerak'
//       ),

//     parol: z
//       .string()
//       .min(8, 'Parol kamida 8 ta belgidan iborat bo‘lishi kerak'),

//     qaytaParol: z.string()
//   })
//   .refine(data => data.parol === data.qaytaParol, {
//     path: ['qaytaParol'],
//     message: 'Parollar bir xil emas'
//   })
