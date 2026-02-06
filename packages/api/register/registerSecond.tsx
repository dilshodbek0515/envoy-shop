import axios from 'axios'
import { SellerProfileData } from '../../../apps/schema/schema'

const API = 'http://envoyshop.webcoder.uz/seller-profile-create/'

export const RegisterSecondFn = async (data: SellerProfileData) => {
  const token = localStorage.getItem('token')

  if (!token) throw new Error('Token topilmadi')

  const formData = new FormData()

  Object.entries(data).forEach(([k, v]) => {
    formData.append(k, v)
  })

  const res = await axios.post(API, formData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return res.data
}
