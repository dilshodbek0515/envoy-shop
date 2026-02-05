'use client'
import './registerSms.css'
import { FC } from 'react'
import Button from '../../../../../shared/ui/button/button'
import MainInput from '../../../../../shared/ui/input/MainInput/input'
import Link from 'next/link'
import { useForm, Controller, Resolver, FieldErrors } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { ZodSchema } from 'zod'
import {
  registerSmsSchema,
  RegisterSmsFormData
} from '../../../../../../../schema/schema'

const safeResolver = <T extends object>(schema: ZodSchema): Resolver<T> => {
  return async (values: any) => {
    try {
      const result = schema.safeParse(values)

      if (result.success) {
        return {
          values: result.data,
          errors: {} as FieldErrors<T>
        }
      }

      const errors = result.error.flatten().fieldErrors

      // TypeScript uchun to'g'ri typed errors
      const formattedErrors = Object.fromEntries(
        Object.entries(errors).map(([key, val]) => [
          key,
          {
            type: 'validation',
            message: val && Array.isArray(val) ? val[0] : String(val)
          }
        ])
      ) as FieldErrors<T>

      return {
        values: {},
        errors: formattedErrors
      }
    } catch (error) {
      console.error('Resolver error:', error)
      return {
        values: {},
        errors: {} as FieldErrors<T>
      }
    }
  }
}

const RegisterSms: FC = () => {
  const router = useRouter()

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    watch
  } = useForm<RegisterSmsFormData>({
    resolver: safeResolver(registerSmsSchema),
    mode: 'onChange',
    defaultValues: { smsCode: '' }
  })

  const smsMutation = useMutation({
    mutationFn: (data: { smsCode: string }) => {
      console.log('SMS tasdiqlandi:', data.smsCode)
      return Promise.resolve({ success: true })
    },
    onSuccess: () => router.push('/'),
    onError: (error: any) => console.log('SMS tasdiqlashda xatolik:', error)
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
                      // faqat raqam va 4ta belgi
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
