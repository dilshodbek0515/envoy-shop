import axios from 'axios'

const RegisterSmsApi =
  'http://envoyshop.webcoder.uz/api/auth/verify-phone/confirm/'

export interface RegisterSmsPayload {
  phone: string
  code: string
}

export const RegisterSmsFn = async (data: RegisterSmsPayload) => {
  const formData = new FormData()

  formData.append('phone', data.phone)
  formData.append('code', data.code)

  const res = await axios.post(RegisterSmsApi, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })

  return res.data
}
