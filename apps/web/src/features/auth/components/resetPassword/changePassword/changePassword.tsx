'use client'
import Link from 'next/link'
import './changePassword.css'
import { FC } from 'react'
import Button from '../../../../../shared/ui/button/button'
import MainInput from '../../../../../shared/ui/input/MainInput/input'
import { PasswordFn } from '../../../../../../../../packages/api/resetPassword/change-password'
import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'

// Schema
const changePasswordSchema = z
  .object({
    firstPassword: z.string().min(8, "Parol kamida 8 ta bo'lishi kerak"),
    secondPassword: z.string().min(8, "Parol kamida 8 ta bo'lishi kerak")
  })
  .refine(data => data.firstPassword === data.secondPassword, {
    message: 'Parollar mos kelmayapti',
    path: ['secondPassword']
  })

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>

const ChangePassword: FC = () => {
  const router = useRouter()

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    watch
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    mode: 'onChange',
    defaultValues: {
      firstPassword: '',
      secondPassword: ''
    }
  })

  const passwordMutation = useMutation({
    mutationFn: (data: { password: string; confirmPassword: string }) =>
      PasswordFn({
        password: data.password,
        confirmPassword: data.confirmPassword
      }),
    onSuccess: () => {
      router.push('/Login')
    },
    onError: (error: any) => {
      console.log('Ishlamadi', error)
    }
  })

  const firstPasswordValue = watch('firstPassword') || ''
  const secondPasswordValue = watch('secondPassword') || ''

  const onSubmit = (data: ChangePasswordFormData) => {
    if (isValid && data.firstPassword && data.secondPassword) {
      passwordMutation.mutate({
        password: data.firstPassword,
        confirmPassword: data.secondPassword
      })
    }
  }

  const isFormValid =
    firstPasswordValue.length >= 8 &&
    secondPasswordValue.length >= 8 &&
    firstPasswordValue === secondPasswordValue

  return (
    <div className='container'>
      <div className='login_box'>
        <h2 className='login_title'>Parolni o'zgartirish</h2>

        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          <div className='input_group'>
            <Controller
              name='firstPassword'
              control={control}
              render={({ field }) => (
                <MainInput
                  label='Parol'
                  type='password'
                  {...field}
                  value={field.value || ''}
                  onChange={value => field.onChange(value)}
                />
              )}
            />
            {errors.firstPassword && firstPasswordValue.length > 0 && (
              <div className='error_text'>{errors.firstPassword.message}</div>
            )}
          </div>

          <div className='input_group'>
            <Controller
              name='secondPassword'
              control={control}
              render={({ field }) => (
                <MainInput
                  label='Qayta parol'
                  type='password'
                  {...field}
                  value={field.value || ''}
                  onChange={value => field.onChange(value)}
                />
              )}
            />
            {errors.secondPassword && secondPasswordValue.length > 0 && (
              <div className='error_text'>{errors.secondPassword.message}</div>
            )}
          </div>

          <Button
            type='submit'
            label={
              passwordMutation.isPending
                ? 'Kutilmoqda...'
                : 'Parolni tasdiqlash'
            }
            disabled={!isFormValid || passwordMutation.isPending}
          />
        </form>

        <div className='route_bottom'>
          <Link href='/Login' className='route_button_style'>
            Kirish
          </Link>
          <Link href={'/Login'}>➡️</Link>
          <Link href='/Register' className='route_button_style'>
            Ro'yxatdan o'tish
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword
