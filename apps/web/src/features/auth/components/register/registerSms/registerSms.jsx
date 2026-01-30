'use client'
import './registerSms.css'
import { useState } from 'react'
import Button from '../../../../../shared/ui/button/button'
import MainInput from '../../../../../shared/ui/input/MainInput/input'
import Link from 'next/link'
const RegisterSms = () => {
  const [smsCode, setSmsCode] = useState('')

  const handleChange = e => {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length <= 4) {
      setSmsCode(value)
    }
  }

  const isSmsValid = smsCode.length === 4
  const handleSubmit = e => {
    e.preventDefault()

    if (!isSmsValid) return

    console.log('SMS tasdiqlandi:', smsCode)
  }

  return (
    <div className='container'>
      <div className='login_box'>
        <h2 className='login_title'>SMS</h2>

        <MainInput
          label={'SMS kod'}
          name='sms'
          type='text'
          value={smsCode}
          handleChange={handleChange}
        />

        <Button
          type='submit'
          label={'SMS ni tasdiqlash'}
          handleSubmit={handleSubmit}
          disabled={!isSmsValid}
        />

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
