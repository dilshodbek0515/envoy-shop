import axios from 'axios'
const API = 'https://my.example.uz.webcoder.uz/user/sign-in/'

export const RegisterFn = async ({ registerFormValid }) => {
  const { data } = await axios.post(API, { registerFormValid })
  return data
}
