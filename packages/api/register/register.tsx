import axios, { AxiosResponse } from 'axios'
const API = 'http://envoyshop.webcoder.uz/users/register/'

interface RegistrationData {
  role: 'seller' | 'buyer' | string
  phone: string
  email: string
  password: string
  confirm_password: string
}

interface RegisterFnArgs {
  fullData: RegistrationData
}

export const RegisterFn = async ({ fullData }: RegisterFnArgs) => {
  try {
    const formData = new FormData()
    formData.append('role', fullData.role)
    formData.append('email', fullData.email)
    formData.append('phone', fullData.phone)
    formData.append('password', fullData.password)
    formData.append('confirm_password', fullData.confirm_password)

    const { data }: AxiosResponse = await axios.post(API, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    // Tokenlarni localStorage ga saqlash
    if (data.access && data.refresh) {
      localStorage.setItem('token', data.access)
      localStorage.setItem('register_sms_code', data.code)
    }

    console.log(fullData)
    console.log(data)

    return data
  } catch (error: any) {
    console.error('RegisterFnda xatolik:', error)
    throw error.response?.data || error
  }
}
