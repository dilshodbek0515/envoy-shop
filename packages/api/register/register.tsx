import { api, SEND_OTP_API } from '../../lib/endpoints'

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

  const res = await api.post(SEND_OTP_API, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  console.log(res.data)
  localStorage.setItem('register_payload', JSON.stringify(data))
  return res.data
}
