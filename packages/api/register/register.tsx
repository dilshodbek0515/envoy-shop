import axios, { AxiosResponse } from 'axios'
const API = 'https://my.example.uz.webcoder.uz/user/sign-in/'

interface RegistrationData {
  role: 'legal' | 'physical'
  userType: 'seller' | 'buyer'
  firstName?: string
  lastName?: string
  stir?: string
  activityType?: string
  companyName?: string
  legalAddress?: string
  bankDetails?: string
  phoneNumber?: string
  password?: string
  confirmPassword?: string
  firstNamePhysical?: string
  lastNamePhysical?: string
  phoneNumberPhysical?: string
  passwordPhysical?: string
  emailPhysical?: string
  confirmPasswordPhysical?: string
}

interface RegisterFnArgs {
  registrationData: RegistrationData
}

export const RegisterFn = async ({ registrationData }: RegisterFnArgs) => {
  try {
    const { data }: AxiosResponse = await axios.post(API, registrationData)
    return data
  } catch (error) {
    console.error('RegisterFn xatolik:', error)
    throw error
  }
}
