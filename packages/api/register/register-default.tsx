import axios from 'axios'
import { PREFIX } from '../api'

const RegisterDefaultApi = {
  api: `${PREFIX}/api/auth/register/`
}

export interface RegisterDefaultPayload {
  role: 'buyer' | 'seller'
  email?: string
  password: string
}

export const RegisterDefaultFn = async (data: RegisterDefaultPayload) => {
  const token = localStorage.getItem('access_token')
  if (!token) throw new Error('Token yuq')
  const formData = new FormData()
  formData.append('role', data.role)
  formData.append('password', data.password)
  if (data.email) formData.append('email', data.email)

  const res = await axios.put(RegisterDefaultApi.api, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  })

  console.log(res.data)

  return res.data
}
