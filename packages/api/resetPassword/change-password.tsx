'use client'
import { AxiosResponse } from 'axios'
import { api, CHANGE_PASSWORD_API } from 'packages/lib/axios'
export interface PasswordArgs {
  password: string
}

export interface PasswordResponse {
  success?: boolean
  message?: string
  [key: string]: any
}

export const PasswordFn = async ( data: PasswordArgs): Promise<PasswordResponse> => {

  const token = localStorage.getItem('access_token')
  
  const res: AxiosResponse<PasswordResponse> = await api.put(
    CHANGE_PASSWORD_API,
    { password: data.password },
    { headers: { Authorization: `Bearer ${token}` } }
  )

  console.log(res.data.message)

  return res.data
}
