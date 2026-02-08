import axios, { AxiosResponse } from 'axios'

const API = 'http://envoyshop.webcoder.uz/api/auth/check-phone/'

export interface SmsArgs {
  phone: string
}

export interface SmsResponse {
  message: boolean
}

export const SmsFn = async ({ phone }: SmsArgs): Promise<SmsResponse> => {
  try {
    const { data }: AxiosResponse<SmsResponse> = await axios.post(API, {
      phone,
      purpose: 'reset_password'
    })

    console.log(data)
    return data
  } catch (error) {
    console.error('SmsFn xatolik:', error)
    throw error
  }
}
