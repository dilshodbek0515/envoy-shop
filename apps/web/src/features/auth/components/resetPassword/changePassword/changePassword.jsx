'use client'
import './changePassword.css'
import MainInput from '../../../../../shared/ui/input/MainInput/input'
import Button from '../../../../../shared/ui/button/button'
import Link from 'next/link'
import { useState } from 'react'
const ChangePassword = () => {
  const [changePasswordForm, setChangePasswordForm] = useState({
    firstPassword: '',
    secondPassword: ''
  })

  const handleChange = e => {
    const { name, value } = e.target
    setChangePasswordForm(prev => ({
      ...prev,
      [name]: value
    }))
  }
  return (
    <div className='container'>
      <div className='login_box'>
        <h2 className='login_title'>Parolni o'zgartirish</h2>

        <MainInput
          name='firstPassword'
          value={changePasswordForm.firstPassword}
          label={'Parol'}
          handleChange={handleChange}
        />
        <MainInput
          name='secondPassword'
          value={changePasswordForm.secondPassword}
          label={'Qayta parol'}
          handleChange={handleChange}
        />

        <Button type='submit' label={'Parolni tasdiqlash'} path='/Login' />

        <div className='route_bottom'>
          <Link href='/Login' className='route_button_style'>
            Kirish
          </Link>
          <Link href='/Register' className='route_button_style'>
            Ro'yxatdan o'tish
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword
