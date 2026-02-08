import axios from 'axios'

const API = 'http://envoyshop.webcoder.uz/api/auth/seller-profile-create/'

export interface SellerProfilePayload {
  first_name: string
  last_name: string
  type: 'individual' | 'company'
  company_name: string
  inn: string
  company_type: string
  address: string
}

export const SellerInformationFn = async (data: SellerProfilePayload) => {
  const token = localStorage.getItem('access_token')
  if (!token) throw new Error('Token yo‘q')

  const res = await axios.post(API, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  console.log('SELLER PROFILE:', res.data)
  return res.data
}
