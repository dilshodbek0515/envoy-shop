'use client'
import './registerSms.css'
import { FC, useState } from 'react'
import Button from '../../../../../shared/ui/button/button'
import MainInput from '../../../../../shared/ui/input/MainInput/input'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
interface SmsFormData {
  code: string
}

const RegisterSms: FC = () => {
  const router = useRouter()
  const [isChange, setIsChange] = useState(false)

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<SmsFormData>({
    mode: 'onChange',
    defaultValues: { code: '' }
  })

  const onSubmit = (data: SmsFormData) => {
    router.replace('/register/register-second')
  }

  return (
    <div className='container'>
      <div className='login_box'>
        <h2 className='login_title'>SMS tasdiqlash</h2>

        <form onSubmit={handleSubmit(onSubmit)} className='sms_form'>
          <div className='sms_input_container'>
            <div className='input_group sms_input_wrapper'>
              <Controller
                name='code'
                control={control}
                render={({ field }) => (
                  <MainInput
                    label='SMS kod'
                    value={field.value}
                    onChange={value => {
                      const onlyNumbers = value.replace(/\D/g, '').slice(0, 4)
                      field.onChange(onlyNumbers)
                      setIsChange(true)
                    }}
                  />
                )}
              />
            </div>
          </div>

          <div className='sms_button_container'>
            <Button
              type='submit'
              label='SMS ni tasdiqlash'
              disabled={!isChange}
            />
          </div>
        </form>

        <div className='route_bottom'>
          <Link href='/login' className='route_button_style'>
            <span className='acc'>Akkountingiz bormi? </span> Kirish
          </Link>
          <p />
        </div>
      </div>
    </div>
  )
}

export default RegisterSms
