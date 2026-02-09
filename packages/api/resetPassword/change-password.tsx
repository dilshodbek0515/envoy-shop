import axios, { AxiosResponse } from 'axios'

const API = 'http://envoyshop.webcoder.uz/api/auth/password-reset/'

export interface PasswordArgs {
  password: string
}

export interface PasswordResponse {
  success?: boolean
  message?: string
  [key: string]: any
}

export const PasswordFn = async (
  data: PasswordArgs
): Promise<PasswordResponse> => {
  const token = localStorage.getItem('access_token')
  const res: AxiosResponse<PasswordResponse> = await axios.put(
    API,
    { password: data.password },
    { headers: { Authorization: `Bearer ${token}` } }
  )

  return res.data
}
