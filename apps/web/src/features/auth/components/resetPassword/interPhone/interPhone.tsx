'use client'
import './interPhone.css'
import Link from 'next/link'
import { FC, useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '../../../../../shared/ui/button/button'
import MainInput from '../../../../../shared/ui/input/MainInput/input'
import InputPhone from '../../../../../shared/ui/input/InputPhone/InputPhone'
import { SmsFn } from '../../../../../../../../packages/api/resetPassword/reset-password'
import { useForm, Controller, Resolver } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import {
  interPhoneSchema,
  InterPhoneFormData
} from '../../../../../../../schema/schema'

const InterPhone: FC = () => {
  const router = useRouter()
  const [step, setStep] = useState<1 | 2>(1)

  // ✅ Safe Zod resolver - step o'zgaruvchisini ichida ishlatish uchun
  const createResolver = (currentStep: 1 | 2): Resolver<InterPhoneFormData> => {
    return async values => {
      const schema = interPhoneSchema(currentStep)
      const result = schema.safeParse(values)

      if (result.success) {
        return {
          values: result.data,
          errors: {}
        }
      }

      const errors = result.error.flatten().fieldErrors
      return {
        values: {},
        errors: Object.fromEntries(
          Object.entries(errors).map(([key, val]) => [
            key,
            { type: 'validation', message: val?.[0] }
          ])
        )
      }
    }
  }

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    watch,
    trigger
  } = useForm<InterPhoneFormData>({
    resolver: createResolver(step),
    mode: 'onChange',
    defaultValues: {
      phone: '',
      smsPassword: ''
    }
  })

  // ✅ React Query mutation
  const smsMutation = useMutation({
    mutationFn: (data: { phone: string; smsPassword: string }) =>
      SmsFn({ phone: `+998${data.phone}`, smsPassword: data.smsPassword }),
    onSuccess: () => router.push('/ResetPassword/ChangePassword'),
    onError: err => console.log('Xato:', err)
  })

  const phoneValue = watch('phone') || ''
  const smsValue = watch('smsPassword') || ''

  // ✅ Form submit
  const onSubmit = async (data: InterPhoneFormData) => {
    if (step === 1) {
      const isValid = await trigger()
      if (isValid) {
        setStep(2)
      }
      return
    }

    if (!data.smsPassword) return
    smsMutation.mutate({ phone: data.phone, smsPassword: data.smsPassword })
  }

  // ✅ Orqaga qaytish funksiyasi
  const handleBack = () => {
    setStep(1)
  }

  // ✅ Disabled logic
  const isPhoneValid = phoneValue.length === 9
  const isSmsValid = smsValue.length === 4
  const disabled =
    step === 1
      ? !isPhoneValid
      : !isPhoneValid || !isSmsValid || smsMutation.isPending

  return (
    <div className='container'>
      <div className='login_box'>
        <h2 className='login_title'>Parolni tiklash</h2>

        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          {/* PHONE INPUT */}
          <div className='input_group'>
            <Controller
              name='phone'
              control={control}
              render={({ field }) => (
                <InputPhone
                  label='Telefon raqam'
                  value={field.value || ''}
                  onChange={value => {
                    const numbers = value.replace(/\D/g, '').slice(0, 9)
                    field.onChange(numbers)
                    if (numbers.length === 9) {
                      trigger('phone')
                    }
                  }}
                />
              )}
            />
            {errors.phone && (
              <div className='error_text'>{errors.phone.message}</div>
            )}
          </div>

          {/* SMS STEP */}
          {step === 2 && (
            <div className='input_group'>
              <Controller
                name='smsPassword'
                control={control}
                render={({ field }) => (
                  <MainInput
                    label='SMS kod'
                    value={field.value || ''}
                    onChange={value => {
                      const numbers = value.replace(/\D/g, '').slice(0, 4)
                      field.onChange(numbers)
                      if (numbers.length === 4) {
                        trigger('smsPassword')
                      }
                    }}
                    maxLength={4}
                  />
                )}
              />
              {errors.smsPassword && (
                <div className='error_text'>{errors.smsPassword.message}</div>
              )}
            </div>
          )}

          {/* BUTTON GROUP */}
          <div className='button_group'>
            <Button
              type='submit'
              label={
                step === 1
                  ? 'SMS yuborish'
                  : smsMutation.isPending
                  ? 'Kutilmoqda...'
                  : 'SMS ni tasdiqlash'
              }
              disabled={disabled}
            />
          </div>
        </form>

        <div className='route_bottom'>
          <Link href='/Login' className='route_button_style'>
            Kirish
          </Link>
          <Link href='/ResetPassword/ChangePassword'>➡️</Link>
          <Link href='/Register' className='route_button_style'>
            Ro'yxatdan o'tish
          </Link>
        </div>
      </div>
    </div>
  )
}

export default InterPhone
