'use client'
import { useState } from 'react'
import Button from '../../../../shared/ui/button/button'
import InputPhone from '../../../../shared/ui/input/InputPhone/InputPhone'
import MainInput from '../../../../shared/ui/input/MainInput/input'
import './login.css'
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

        <Button type='submit' label={'Kirish'} />
      </div>
    </div>
  )
}

export default Login
