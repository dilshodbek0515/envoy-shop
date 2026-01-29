'use client'
import Link from 'next/link'
import './changePassword.css'
import { useState } from 'react'
import Button from '../../../../../shared/ui/button/button'
import MainInput from '../../../../../shared/ui/input/MainInput/input'
import { PasswordFn } from '../../../../../../../../packages/api/resetPassword/change-password'
import { AxiosError } from 'axios'
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

  const isFirstPasswordValid = changePasswordForm.firstPassword.length >= 8
  const isSecondPasswordValid = changePasswordForm.secondPassword.length >= 8
  const isFormValid = isFirstPasswordValid && isSecondPasswordValid

  const handleChangePassword = async () => {
    if (!isFormValid) return
    const { firstPassword, secondPassword } = changePasswordForm

    try {
      const res = await PasswordFn({ firstPassword, secondPassword })
      router.push('/Login')
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

        <Button
          type='submit'
          label={'Parolni tasdiqlash'}
          path='/Login'
          disabled={!isFormValid}
          handleSubmit={handleChangePassword}
        />

        <div className='route_bottom'>
          <Link href='/Login' className='route_button_style'>
            Kirish
          </Link>
          <Link href={'/Login'}>➡️</Link>
          <Link href='/Register' className='route_button_style'>
            Ro'yxatdan o'tish
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword
