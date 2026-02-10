import axios, { AxiosResponse } from 'axios'
import { PREFIX } from '../api'

const Login_Api = {
  api: `${PREFIX}/api/auth/login/`
}

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

export const LoginFn = async ({
  phone,
  password
}: LoginArgs): Promise<LoginResponse> => {
  try {
    const { data }: AxiosResponse<LoginResponse> = await axios.post(
      Login_Api.api,
      { phone, password }
    )
    localStorage.setItem('token', data.token.access)
    return data
  } catch (error) {
    throw error
  }
}
