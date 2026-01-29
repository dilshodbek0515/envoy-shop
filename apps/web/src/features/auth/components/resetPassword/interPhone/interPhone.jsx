'use client'
import './interPhone.css'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '../../../../../shared/ui/button/button'
import MainInput from '../../../../../shared/ui/input/MainInput/input'
import InputPhone from '../../../../../shared/ui/input/InputPhone/InputPhone'
import { SmsFn } from '../../../../../../../../packages/api/resetPassword/reset-password'
import { AxiosError } from 'axios'
const InterPhone = () => {
  const router = useRouter()
  const [interPhoneForm, setInterPhoneForm] = useState({
    phone: '',
    smsPassword: ''
  })

  const handleChange = e => {
    const { name, value } = e.target
    setInterPhoneForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const isPhoneValid = interPhoneForm.phone.length === 9
  const isSmsPasswordValid = interPhoneForm.smsPassword.length === 4
  const isFormValid = isPhoneValid && isSmsPasswordValid

  const handlePassword = async () => {
    if (!isFormValid) return
    const { phone, smsPassword } = interPhoneForm
    const formattedPhone = `+998${phone}`

    try {
      const res = await SmsFn({ phone: formattedPhone, smsPassword })
      router.push('/ResetPassword/ChangePassword')
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
        <h2 className='login_title'>Parolni tiklash</h2>

        <InputPhone
          name='phone'
          value={interPhoneForm.phone}
          label={'Telefon raqam'}
          handleChange={handleChange}
        />

        <MainInput
          name='smsPassword'
          value={interPhoneForm.smsPassword}
          label={'SMS kod'}
          handleChange={handleChange}
          maxLength={4}
        />

        <Button
          type='submit'
          label={'SMS ni tasdiqlash'}
          disabled={!isFormValid}
          handleSubmit={handlePassword}
        />

        <div className='route_bottom'>
          <Link href='/Login' className='route_button_style'>
            Kirish
          </Link>
          <Link href={'/ResetPassword/ChangePassword'}>➡️</Link>
          <Link href='/Register' className='route_button_style'>
            Ro'yxatdan o'tish
          </Link>
        </div>
      </div>
    </div>
  )
}

export default InterPhone
