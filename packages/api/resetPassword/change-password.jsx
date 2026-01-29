import axios from 'axios'
// const API = 'https://my.example.uz.webcoder.uz/user/sign-in/'
export const PasswordFn = async ({ password, confiemPassword }) => {
  const { data } = await axios.post(API, { password, confiemPassword })
  return data
}
