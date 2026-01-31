import axios, { AxiosResponse } from 'axios'

const API = 'https://my.example.uz.webcoder.uz/user/sign-in/'

interface LoginArgs {
  phone: string
  password: string
}

interface LoginResponse {
  token?: string
  userId?: string
  [key: string]: any
}

export const LoginFn = async ({
  phone,
  password
}: LoginArgs): Promise<LoginResponse> => {
  try {
    const { data }: AxiosResponse<LoginResponse> = await axios.post(API, {
      phone,
      password
    })
    return data
  } catch (error) {
    console.error('LoginFn xatolik:', error)
    throw error
  }
}
