import z from 'zod'

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
