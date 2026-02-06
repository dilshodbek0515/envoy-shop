'use client'
import './registerSms.css'
import { FC, useEffect, useState } from 'react'
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
  const [correctCode, setCorrectCode] = useState<string | null>('')

  useEffect(() => {
    const code = localStorage.getItem('register_sms_code')
    setCorrectCode(code)
  }, [])

  // const safeSmsResolver: Resolver<SmsFormData> = async values => {
  //   const result = smsSchema.safeParse(values)
  //   if (result.success) return { values: result.data, errors: {} }

  //   const errors = result.error.flatten().fieldErrors
  //   return {
  //     values: {},
  //     errors: Object.fromEntries(
  //       Object.entries(errors).map(([key, val]) => [
  //         key,
  //         { type: 'validation', message: val?.[0] }
  //       ])
  //     )
  //   }
  // }

  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors, isValid }
  } = useForm<SmsFormData>({
    mode: 'onChange',
    defaultValues: { code: '' }
  })
  const codeValue = watch('code')

  const onSubmit = (data: SmsFormData) => {
    const role = localStorage.getItem('role')
    if (data.code !== correctCode) {
      reset()
      return
    }
    router.replace(role === 'seller' ? '/register/register-second' : '/')
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
              {errors.code && codeValue.length > 0 && (
                <div className='error_text'>{errors.code.message}</div>
              )}
            </div>
          </div>

          <div className='sms_button_container'>
            <Button
              type='submit'
              label='SMS ni tasdiqlash'
              disabled={!isChange || codeValue.length !== 4}
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
