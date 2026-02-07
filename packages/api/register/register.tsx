import axios from 'axios'

const API = 'http://envoyshop.webcoder.uz/api/auth/verify-phone/send-otp/'

export interface RegistrationData {
  phone: string
  ip_address: string
  device_id: string
  purpose: string
}

export const RegisterFn = async (data: RegistrationData) => {
  const formData = new FormData()

  formData.append('phone', data.phone)
  formData.append('ip_address', data.ip_address)
  formData.append('device_id', data.device_id)
  formData.append('purpose', data.purpose)

  const res = await axios.post(API, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  return res.data
}
