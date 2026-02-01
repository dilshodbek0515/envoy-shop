'use client'
import './interPhone.css'
import Link from 'next/link'
import { FC, useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '../../../../../shared/ui/button/button'
import MainInput from '../../../../../shared/ui/input/MainInput/input'
import InputPhone from '../../../../../shared/ui/input/InputPhone/InputPhone'
import { SmsFn } from '../../../../../../../../packages/api/resetPassword/reset-password'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'

/* ✅ Step based schema */
const getSchema = (step: number) =>
  z.object({
    phone: z
      .string()
      .min(9, "Telefon raqam 9 ta bo'lishi kerak")
      .max(9, "Telefon raqam 9 ta bo'lishi kerak")
      .regex(/^\d+$/, 'Faqat raqamlar kiriting'),

    smsPassword:
      step === 2
        ? z
            .string()
            .length(4, "SMS kod 4 ta bo'lishi kerak")
            .regex(/^\d+$/, 'Faqat raqamlar kiriting')
        : z.string().optional()
  })

type InterPhoneFormData = {
  phone: string
  smsPassword: string | undefined
}

const InterPhone: FC = () => {
  const router = useRouter()
  const [step, setStep] = useState<1 | 2>(1)

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch
  } = useForm<InterPhoneFormData>({
    resolver: zodResolver(getSchema(step)),
    mode: 'onChange',
    defaultValues: {
      phone: '',
      smsPassword: ''
    }
  })

  /* ✅ mutation */
  const smsMutation = useMutation({
    mutationFn: (data: { phone: string; smsPassword: string }) =>
      SmsFn({ phone: `+998${data.phone}`, smsPassword: data.smsPassword }),

    onSuccess: () => {
      router.push('/ResetPassword/ChangePassword')
    },

    onError: err => {
      console.log('Xato:', err)
    }
  })

  const phoneValue = watch('phone') || ''
  const smsValue = watch('smsPassword') || ''

  /* ✅ submit logic */
  const onSubmit = (data: InterPhoneFormData) => {
    if (step === 1) {
      setStep(2)
      return
    }

    if (!data.smsPassword) return

    smsMutation.mutate({
      phone: data.phone,
      smsPassword: data.smsPassword
    })
  }

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
          {/* PHONE */}
          <div className='input_group'>
            <Controller
              name='phone'
              control={control}
              render={({ field }) => (
                <InputPhone
                  label='Telefon raqam'
                  value={field.value || ''}
                  onChange={field.onChange}
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
                    onChange={field.onChange}
                    maxLength={4}
                  />
                )}
              />
              {errors.smsPassword && (
                <div className='error_text'>{errors.smsPassword.message}</div>
              )}
            </div>
          )}

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
        </form>

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
