import axios from 'axios'
const API = 'https://my.example.uz.webcoder.uz/user/sign-in/'
export const LoginFn = async ({ phone, password }) => {
  const { data } = await axios.post(API, { phone, password })
  return data
}
