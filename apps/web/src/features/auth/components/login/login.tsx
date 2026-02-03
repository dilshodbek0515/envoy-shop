'use client'
import './login.css'
import { FC } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import Button from '../../../../shared/ui/button/button'
import { LoginFn } from '../../../../../../../packages/api/login/login'
import InputPhone from '../../../../shared/ui/input/InputPhone/InputPhone'
import PasswordInput from 'apps/web/src/shared/ui/input/PasswordInput/PasswordInput'

// Schema
const loginSchema = z.object({
  phone: z
    .string()
    .min(9, "Telefon raqam 9 ta bo'lishi kerak")
    .max(9, "Telefon raqam 9 ta bo'lishi kerak")
    .regex(/^\d+$/, 'Faqat raqamlar kiriting'),
  password: z.string().min(8, "Parol kamida 8 ta bo'lishi kerak")
})

type LoginFormData = z.infer<typeof loginSchema>

const Login: FC = () => {
  const router = useRouter()

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    watch
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      phone: '',
      password: ''
    }
  })

  const loginMutation = useMutation({
    mutationFn: (data: { phone: string; password: string }) =>
      LoginFn({ phone: `+998${data.phone}`, password: data.password }),
    onSuccess: () => {
      router.push('/')
    },
    onError: (error: any) => {
      console.log('Ishlamadi', error)
    }
  })

  const phoneValue = watch('phone') || ''
  const passwordValue = watch('password') || ''

  const onSubmit = (data: LoginFormData) => {
    if (isValid && data.phone && data.password) {
      loginMutation.mutate({ phone: data.phone, password: data.password })
    }
  }

  const isFormValid = phoneValue.length === 9 && passwordValue.length >= 8

  return (
    <div className='container'>
      <div className='login_box'>
        <h2 className='login_title'>Kirish</h2>

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
              name='password'
              control={control}
              render={({ field }) => (
                <PasswordInput
                  label='Parol'
                  {...field}
                  value={field.value || ''}
                  onChange={value => field.onChange(value)}
                />
              )}
            />
            {errors.password && passwordValue.length > 0 && (
              <div className='error_text'>{errors.password.message}</div>
            )}
          </div>

          <Button
            label={loginMutation.isPending ? 'Kutilmoqda...' : 'Kirish'}
            type='submit'
            disabled={!isFormValid || loginMutation.isPending}
          />
        </form>

        <div className='route_bottom'>
          <Link href='/ResetPassword/InterPhone' className='route_button_style'>
            Parolni unutdingizmi?
          </Link>
          <Link href={'/'}>➡️</Link>
          <Link href='/Register' className='route_button_style'>
            Ro'yxatdan o'tish
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
