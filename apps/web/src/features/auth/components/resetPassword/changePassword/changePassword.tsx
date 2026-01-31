'use client'
import Link from 'next/link'
import './changePassword.css'
import { useState } from 'react'
import Button from '../../../../../shared/ui/button/button'
import MainInput from '../../../../../shared/ui/input/MainInput/input'
import { PasswordFn } from '../../../../../../../../packages/api/resetPassword/change-password'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'

interface ChangePasswordForm {
  firstPassword: string
  secondPassword: string
}

const ChangePassword: React.FC = () => {
  const router = useRouter()
  const [changePasswordForm, setChangePasswordForm] = useState({
    firstPassword: '',
    secondPassword: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setChangePasswordForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const isFirstPasswordValid = changePasswordForm.firstPassword.length >= 8
  const isSecondPasswordValid =
    changePasswordForm.secondPassword === changePasswordForm.firstPassword
  const isFormValid = isFirstPasswordValid && isSecondPasswordValid

  const handleChangePassword = async () => {
    if (!isFormValid) return
    const { firstPassword, secondPassword } = changePasswordForm

    try {
      const res = await PasswordFn({
        password: firstPassword,
        confirmPassword: secondPassword
      })
      router.push('/Login')
      console.log('Ishladi', res)
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log('Ishlamadi', error.response?.data || error.message)
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
