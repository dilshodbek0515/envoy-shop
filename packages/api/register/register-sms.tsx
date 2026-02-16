import { SMS_API } from '../../lib/endpoints'
import { api } from '../../lib/api'
export interface RegisterSmsPayload {
  phone: any
  code: string
}

export const RegisterSmsFn = async (data: RegisterSmsPayload) => {
  const formData = new FormData()

  formData.append('phone', data.phone)
  formData.append('code', data.code)

  const res = await api.post(SMS_API, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })

  localStorage.setItem('access_token', res.data.token.access)
  console.log(res.data)
  return res.data
}
