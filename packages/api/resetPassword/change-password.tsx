'use client'
import { api } from '../../lib/api'
import { CHANGE_PASSWORD_API } from '../../lib/endpoints'
export interface PasswordArgs {
  password: string
}

export interface PasswordResponse {
  success?: boolean
  message?: string
  [key: string]: any
}

export const PasswordFn = async (data: PasswordArgs) => {
  const token = localStorage.getItem('access_token')

  const res = await api.put(
    CHANGE_PASSWORD_API,
    { password: data.password },
    { headers: { Authorization: `Bearer ${token}` } }
  )

  console.log(res.data.message)
  return res.data
}
