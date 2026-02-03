'use client'
import './registerSms.css'
import { FC } from 'react'
import Button from '../../../../../shared/ui/button/button'
import MainInput from '../../../../../shared/ui/input/MainInput/input'
import Link from 'next/link'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import {
  registerSmsSchema,
  RegisterSmsFormData
} from '../../../../../../../../packages/schema/schema'
const RegisterSms: FC = () => {
  const router = useRouter()

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    watch
  } = useForm<RegisterSmsFormData>({
    resolver: zodResolver(registerSmsSchema),
    mode: 'onChange',
    defaultValues: {
      smsCode: ''
    }
  })
  const sms = 1234

  const smsMutation = useMutation({
    mutationFn: (data: { smsCode: string }) => {
      console.log('SMS tasdiqlandi:', data.smsCode)
      return Promise.resolve({ success: true })
    },
    onSuccess: () => {
      router.push('/')
    },
    onError: (error: any) => {
      console.log('SMS tasdiqlashda xatolik:', error)
    }
  })

  const smsCodeValue = watch('smsCode') || ''

  const onSubmit = (data: RegisterSmsFormData) => {
    if (isValid && data.smsCode) {
      smsMutation.mutate({ smsCode: data.smsCode })
    }
  }

  return (
    <div className='container'>
      <div className='login_box'>
        <h2 className='login_title'>SMS</h2>

        <form onSubmit={handleSubmit(onSubmit)} className='sms_form'>
          <div className='sms_input_container'>
            <div className='input_group sms_input_wrapper'>
              <Controller
                name='smsCode'
                control={control}
                render={({ field }) => (
                  <MainInput
                    label='SMS kod'
                    {...field}
                    value={field.value || ''}
                    onChange={value => {
                      const onlyNumbers = value.replace(/\D/g, '').slice(0, 4)
                      field.onChange(onlyNumbers)
                    }}
                  />
                )}
              />
              {errors.smsCode && smsCodeValue.length > 0 && (
                <div className='error_text'>{errors.smsCode.message}</div>
              )}
            </div>
          </div>

          <div className='sms_button_container'>
            <Button
              type='submit'
              label={
                smsMutation.isPending ? 'Kutilmoqda...' : 'SMS ni tasdiqlash'
              }
              disabled={!isValid || smsMutation.isPending}
            />
          </div>
        </form>

        <div className='route_bottom'>
          <Link href='/Login' className='route_button_style'>
            <span className='acc'>Akkountingiz bormi? </span> Kirish
          </Link>

          <Link href={'/'}>➡️</Link>
        </div>
      </div>
    </div>
  )
}

export default RegisterSms
