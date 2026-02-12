import axios, { AxiosResponse } from 'axios'
import { PREFIX } from '../api'

const LOGIN_URL = `${PREFIX}/api/auth/login/`

export interface LoginArgs {
  phone: string
  password: string
}
export interface LoginResponse {
  token: {
    access: string
    refresh: string
  }
}

export const LoginFn = async (payload: LoginArgs): Promise<LoginResponse> => {
  const { data }: AxiosResponse<LoginResponse> = await axios.post(
    LOGIN_URL,
    payload
  )

  if (typeof window !== 'undefined') {
    localStorage.setItem('token', data.token.access)
  }
  return data
}
