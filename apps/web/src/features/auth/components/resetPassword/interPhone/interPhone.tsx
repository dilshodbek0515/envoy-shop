'use client'
import './interPhone.css'
import Link from 'next/link'
import React, { FC } from 'react'
import { useRouter } from 'next/navigation'
import Button from '../../../../../shared/ui/button/button'
import MainInput from '../../../../../shared/ui/input/MainInput/input'
import InputPhone from '../../../../../shared/ui/input/InputPhone/InputPhone'
import { SmsFn } from '../../../../../../../../packages/api/resetPassword/reset-password'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'

// Schema
const interPhoneSchema = z.object({
  phone: z
    .string()
    .min(9, "Telefon raqam 9 ta bo'lishi kerak")
    .max(9, "Telefon raqam 9 ta bo'lishi kerak")
    .regex(/^\d+$/, 'Faqat raqamlar kiriting'),
  smsPassword: z
    .string()
    .length(4, "SMS kod 4 ta bo'lishi kerak")
    .regex(/^\d+$/, 'Faqat raqamlar kiriting')
})

type InterPhoneFormData = z.infer<typeof interPhoneSchema>

const InterPhone: FC = () => {
  const router = useRouter()

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    watch
  } = useForm<InterPhoneFormData>({
    resolver: zodResolver(interPhoneSchema),
    mode: 'onChange',
    defaultValues: {
      phone: '',
      smsPassword: ''
    }
  })

  const smsMutation = useMutation({
    mutationFn: (data: { phone: string; smsPassword: string }) =>
      SmsFn({ phone: `+998${data.phone}`, smsPassword: data.smsPassword }),
    onSuccess: () => {
      router.push('/ResetPassword/ChangePassword')
    },
    onError: (error: any) => {
      console.log('Ishlamadi', error)
    }
  })

  const phoneValue = watch('phone') || ''
  const smsPasswordValue = watch('smsPassword') || ''

  const onSubmit = (data: InterPhoneFormData) => {
    if (isValid && data.phone && data.smsPassword) {
      smsMutation.mutate({ phone: data.phone, smsPassword: data.smsPassword })
    }
  }

  const isFormValid = phoneValue.length === 9 && smsPasswordValue.length === 4

  return (
    <div className='container'>
      <div className='login_box'>
        <h2 className='login_title'>Parolni tiklash</h2>

        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          <div className='input_group'>
            <Controller
              name='phone'
              control={control}
              render={({ field }) => (
                <InputPhone
                  label='Telefon raqam'
                  {...field}
                  value={field.value || ''}
                  onChange={value => field.onChange(value)}
                />
              )}
            />
            {errors.phone && phoneValue.length > 0 && (
              <div className='error_text'>{errors.phone.message}</div>
            )}
          </div>

          <div className='input_group'>
            <Controller
              name='smsPassword'
              control={control}
              render={({ field }) => (
                <MainInput
                  label='SMS kod'
                  {...field}
                  value={field.value || ''}
                  onChange={value => field.onChange(value)}
                  maxLength={4}
                />
              )}
            />
            {errors.smsPassword && smsPasswordValue.length > 0 && (
              <div className='error_text'>{errors.smsPassword.message}</div>
            )}
          </div>

          <Button
            type='submit'
            label={
              smsMutation.isPending ? 'Kutilmoqda...' : 'SMS ni tasdiqlash'
            }
            disabled={!isFormValid || smsMutation.isPending}
          />
        </form>

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
