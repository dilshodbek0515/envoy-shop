import { api, LOGIN_API } from '../../lib/endpoints'
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

    console.log(data)
    return data
  } catch (error) {
    throw error
  }
}
