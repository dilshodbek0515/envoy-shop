import { api } from '../../lib/api'
import { LOGIN_API } from '../../lib/endpoints'
import { tokenManager } from '../../lib/tokenManager'

export interface LoginArgs {
  phone: string
  password: string
}

export const LoginFn = async ({ phone, password }: LoginArgs) => {
  try {
    const { data } = await api.post(
      LOGIN_API,
      { phone, password },
      { skipAuth: true }
    )

    if (data.access) {
      tokenManager.setAccess(data.access)
    }

    return data
  } catch (error) {
    throw error
  }
}
