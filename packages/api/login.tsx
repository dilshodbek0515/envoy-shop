import axios from 'axios'

export const Login = async ({
  phone,
  password
}: {
  phone: string
  password: string
}) => {
  const data = axios.post('https://domain.odamqosh.com/user/sign-in/', {
    phone,
    password
  })
  console.log(data)

  return data
}
