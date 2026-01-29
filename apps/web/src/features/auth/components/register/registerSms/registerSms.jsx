'use client'
import './registerSms.css'
import { useState } from 'react'
import Button from '../../../../../shared/ui/button/button'
import InputPhone from '../../../../../shared/ui/input/InputPhone/InputPhone'
import MainInput from '../../../../../shared/ui/input/MainInput/input'
import Link from 'next/link'
const RegisterSms = () => {
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
      <h2 className='login_title'>SMS</h2>

        <MainInput
          label={'Parol'}
          name='password'
          type={'password'}
          value={form.password}
          handleChange={handleChange}
        />

        <Button type='submit' label={'SMS ni tasdiqlash'} path='/' />

        <div className='route_bottom'>
          <Link href='/Login' className='route_button_style'>
            <span className='acc'>Akkountingiz bormi? </span> Kirish
          </Link>
          <span />
        </div>
      </div>
    </div>
  )
}

export default RegisterSms
