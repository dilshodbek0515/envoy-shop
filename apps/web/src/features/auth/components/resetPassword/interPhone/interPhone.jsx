'use client'
import './interPhone.css'
import InputPhone from '../../../../../shared/ui/input/InputPhone/InputPhone'
import MainInput from '../../../../../shared/ui/input/MainInput/input'
import Button from '../../../../../shared/ui/button/button'
import Link from 'next/link'
import { useState } from 'react'

const InterPhone = () => {
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
  const isPasswordValid = interPhoneForm.smsPassword.length === 4
  const isFormValid = isPhoneValid && isPasswordValid

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
        />

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

export default InterPhone
