import axios, { AxiosResponse } from 'axios'
const API = 'http://envoyshop.webcoder.uz/users/register/'

interface RegistrationData {
  firstName: string
  lastName: string
  phone: string
  role: 'customer' | 'seller' | string
  password: string
  confirm_password: string
  user_type: 'yuridik' | 'jismoniy'
  company_type?: string
  company_name?: string
  inn?: string
  bank_rekvizit?: string
  address?: string
}

interface RegisterFnArgs {
  registrationData: RegistrationData
}

export const RegisterFn = async ({ registrationData }: RegisterFnArgs) => {
  try {
    const formData = new FormData()

    // FormData ga barcha fieldlarni qo'shamiz
    formData.append('firstName', registrationData.firstName)
    formData.append('lastName', registrationData.lastName)
    formData.append('phone', registrationData.phone)
    formData.append('role', registrationData.role)
    formData.append('password', registrationData.password)
    formData.append('confirm_password', registrationData.confirm_password)
    formData.append('person_type', registrationData.user_type)

    // Faqat yuridik shaxs uchun qo'shimcha fieldlar
    if (registrationData.user_type === 'yuridik') {
      if (registrationData.company_type)
        formData.append('company_type', registrationData.company_type)
      if (registrationData.company_name)
        formData.append('company_name', registrationData.company_name)
      if (registrationData.inn) formData.append('inn', registrationData.inn)
      if (registrationData.bank_rekvizit)
        formData.append('bank_rekvizit', registrationData.bank_rekvizit)
      if (registrationData.address)
        formData.append('yuridik_manzil', registrationData.address)
    }

    const { data }: AxiosResponse = await axios.post(API, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    // Tokenlarni localStorage ga saqlash
    if (data.access && data.refresh && data.code) {
      localStorage.setItem('access_token', data.access)
      localStorage.setItem('refresh_token', data.refresh)
    }

    console.log(registrationData)

    return data
  } catch (error: any) {
    console.error('RegisterFn xatolik:', error)
    throw error.response?.data || error
  }
}
