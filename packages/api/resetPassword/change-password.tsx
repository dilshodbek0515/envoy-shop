import axios, { AxiosResponse } from 'axios'

const API = 'https://my.example.uz.webcoder.uz/user/sign-in/'

interface PasswordArgs {
  password: string
  confirmPassword: string
}

interface PasswordResponse {
  success?: boolean
  message?: string
  [key: string]: any
}

export const PasswordFn = async ({
  password,
  confirmPassword
}: PasswordArgs): Promise<PasswordResponse> => {
  try {
    const { data }: AxiosResponse<PasswordResponse> = await axios.post(API, {
      password,
      confirmPassword
    })
    return data
  } catch (error) {
    console.error('PasswordFn xatolik:', error)
    throw error
  }
}
