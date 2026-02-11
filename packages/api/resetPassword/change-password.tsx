import axios, { AxiosResponse } from 'axios'
import { PREFIX } from '../api'

const ChangePasswordApi = {
  api: `${PREFIX}/api/auth/password-reset/`
}

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
    ChangePasswordApi.api,
    { password: data.password },
    { headers: { Authorization: `Bearer ${token}` } }
  )

  return res.data
}
