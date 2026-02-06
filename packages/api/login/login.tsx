import axios, { AxiosResponse } from 'axios'
const API = 'http://envoyshop.webcoder.uz/users/login/'

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
    const { data }: AxiosResponse<LoginResponse> = await axios.post(API, {
      phone,
      password
    })
    localStorage.setItem('token', data.token.access)
    console.log(data.token)
    return data
  } catch (error) {
    console.error('LoginFn xatolik:', error)
    throw error
  }
}
