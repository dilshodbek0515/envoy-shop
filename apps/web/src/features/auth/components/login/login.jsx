'use client'
import './login.css'
import { useState } from 'react'
import Button from '../../../../shared/ui/button/button'
import InputPhone from '../../../../shared/ui/input/InputPhone/InputPhone'
import MainInput from '../../../../shared/ui/input/MainInput/input'
import Link from 'next/link'
const Login = () => {
  const [form, setForm] = useState({
    phone: '',
    password: ''
  })

  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: value
    }))
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

        <Button type='submit' label={'Kirish'} path='/' />

        <div className='route_bottom'>
          <Link href='/ResetPassword/InterPhone' className='route_button_style'>
            Parolni unutdingizmi?
          </Link>
          <Link href='/Register' className='route_button_style'>
            Ro'yxatdan o'tish
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
