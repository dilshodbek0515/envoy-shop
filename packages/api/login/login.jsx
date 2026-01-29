import axios from 'axios'
const API = 'https://my.example.uz.webcoder.uz/user/sign-in/'
// const API = 'https://dummyjson.com/auth/login'
export const LoginFn = async ({ phone, password }) => {
  const { data } = await axios.post(API, { phone, password })
  return data
}
