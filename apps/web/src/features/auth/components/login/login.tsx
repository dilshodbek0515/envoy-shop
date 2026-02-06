'use client'
import './login.css'
import { FC } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { useForm, Controller, Resolver } from 'react-hook-form'
import Button from '../../../../shared/ui/button/button'
import { LoginFn } from '../../../../../../../packages/api/login/login'
import InputPhone from '../../../../shared/ui/input/InputPhone/InputPhone'
import PasswordInput from 'apps/web/src/shared/ui/input/PasswordInput/PasswordInput'
import { loginSchema, LoginFormData } from '../../../../../../schema/schema'

const Login: FC = () => {
  const router = useRouter()

  // ✅ Safe Zod resolver
  const safeZodResolver: Resolver<LoginFormData> = async values => {
    const result = loginSchema.safeParse(values)

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

  // ✅ React Hook Form
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: safeZodResolver,
    mode: 'onChange',
    defaultValues: {
      phone: '975790515',
      password: 'Dd05150515!'
    }
  })

  const loginMutation = useMutation({
    mutationFn: (data: LoginFormData) =>
      LoginFn({
        phone: `+998${data.phone}`,
        password: data.password
      }),
    onSuccess: () => {
      router.replace('/')
    },
    onError: error => console.log('Login error:', error)
  })

  const phoneValue = watch('phone') || ''
  const passwordValue = watch('password') || ''

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data)
  }

  const isFormValid = phoneValue.length === 9 && passwordValue.length >= 8

  return (
    <div className='container'>
      <div className='login_box'>
        <h2 className='login_title'>Kirish</h2>

        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          {/* Phone input */}
          <div className='input_group'>
            <Controller
              name='phone'
              control={control}
              render={({ field }) => (
                <InputPhone
                  label='Telefon raqam'
                  value={field.value || ''}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              )}
            />
            {errors.phone && (
              <div className='error_text'>{errors.phone.message}</div>
            )}
          </div>

          {/* Password input */}
          <div className='input_group'>
            <Controller
              name='password'
              control={control}
              render={({ field }) => (
                <PasswordInput
                  label='Parol'
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              )}
            />
            {errors.password && (
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
          <Link
            href='/reset-password/inter-phone'
            className='route_button_style'
          >
            Parolni unutdingizmi?
          </Link>
          <Link href='/register' className='route_button_style'>
            Ro'yxatdan o'tish
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
