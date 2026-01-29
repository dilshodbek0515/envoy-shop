import axios from 'axios'
// const API = 'https://my.example.uz.webcoder.uz/user/sign-in/'
export const SmsFn = async ({ phone, smsPassword }) => {
  const { data } = await axios.post(API, { phone, smsPassword })
  return data
}
