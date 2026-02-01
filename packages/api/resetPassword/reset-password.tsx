import axios, { AxiosResponse } from 'axios'

const API = 'https://my.example.uz.webcoder.uz/user/sign-in/'

export interface SmsArgs {
  phone: string
  smsPassword: string
}

export interface SmsResponse {
  success?: boolean
  message?: string
  [key: string]: any
}

export const SmsFn = async ({
  phone,
  smsPassword
}: SmsArgs): Promise<SmsResponse> => {
  try {
    const { data }: AxiosResponse<SmsResponse> = await axios.post(API, {
      phone,
      smsPassword
    })
    return data
  } catch (error) {
    console.error('SmsFn xatolik:', error)
    throw error
  }
}
