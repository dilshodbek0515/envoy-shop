'use client'
import './login.css'
import { useState } from 'react'
import Button from '../../../../shared/ui/button/button'
import InputPhone from '../../../../shared/ui/input/InputPhone/InputPhone'
import MainInput from '../../../../shared/ui/input/MainInput/input'
import Link from 'next/link'
import { AxiosError } from 'axios'
import { LoginFn } from '../../../../../../../packages/api/login/login'
import { useRouter } from 'next/navigation'

const Login = () => {
  const [form, setForm] = useState({
    phone: '',
    password: ''
  })
  const router = useRouter()
  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const isPhoneValid = form.phone.length === 9
  const isPasswordValid = form.password.length >= 8
  const isFormValid = isPhoneValid && isPasswordValid

  const handleLogin = async () => {
    if (!isFormValid) return
    const { phone, password } = form
    const formattedPhone = `+998${phone}`

    try {
      const res = await LoginFn({ phone: formattedPhone, password })
      router.push('/')
      console.log('Ishladi', res)
    } catch (error) {
      if (error instanceof AxiosError) {
        error.response.data || error.message
        console.log('Ishlamadi')
      }
    }
  }

  return (
    <div className='container'>
      <div className='login_box'>
        <h2 className='login_title'>Kirish</h2>

        <InputPhone
          name='phone'
          value={form.phone}
          label={'Telefon raqam'}
          handleChange={handleChange}
        />

        <MainInput
          label={'Parol'}
          name='password'
          type={'password'}
          value={form.password}
          handleChange={handleChange}
        />

        <Button
          label={'Kirish'}
          type='submit'
          handleSubmit={handleLogin}
          disabled={!isFormValid}
        />

        <div className='route_bottom'>
          <Link href='/ResetPassword/InterPhone' className='route_button_style'>
            Parolni unutdingizmi?
          </Link>
          <Link href={'/'}>➡️</Link>
          <Link href='/Register' className='route_button_style'>
            Ro'yxatdan o'tish
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
