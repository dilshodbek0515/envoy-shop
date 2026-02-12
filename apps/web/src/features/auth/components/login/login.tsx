'use client'
import './login.css'
import styles from '../../styles/auth.module.css'
import { FC } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import Button from '../../../../shared/ui/button/button'
import { useForm, Controller, Resolver } from 'react-hook-form'
import { LoginFn } from '../../../../../../../packages/api/login/login'
import InputPhone from '../../../../shared/ui/input/InputPhone/InputPhone'
<<<<<<< HEAD
import { loginSchema, LoginFormData } from '../../../../../../schema/schema'
=======
import {
  loginSchema,
  LoginFormData
} from '../../../../../../../packages/schema/login-schema'
>>>>>>> 92d0c4977ad75ba94125ce3eb5d0b74a6f584033
import PasswordInput from 'apps/web/src/shared/ui/input/PasswordInput/PasswordInput'

const Login: FC = () => {
  const router = useRouter()

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

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: safeZodResolver,
    mode: 'onChange',
    defaultValues: {
      phone: '',
      password: ''
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
    <div className={styles.container}>
      <div className={styles.login_box}>
        <h2 className={styles.login_title}>Kirish</h2>

        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          {/* Phone input */}
          <div className={styles.input_group}>
            <Controller
              name='phone'
              control={control}
              render={({ field, fieldState }) => (
                <InputPhone
                  label='Telefon raqam'
                  value={field.value || ''}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  error={fieldState.invalid}
                />
              )}
            />
            {errors.phone && (
              <div className={styles.error_text}>{errors.phone.message}</div>
            )}
          </div>

          {/* Password input */}
          <div className={styles.input_group}>
            <Controller
              name='password'
              control={control}
              render={({ field, fieldState }) => (
                <PasswordInput
                  label='Parol'
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  error={fieldState.invalid}
                />
              )}
            />
            {errors.password && (
              <div className={styles.error_text}>{errors.password.message}</div>
            )}
          </div>

          <Button
            type='submit'
            disabled={!isFormValid}
            loading={loginMutation.isPending}
            label='Kirish'
          />
        </form>

        <div className={styles.route_bottom}>
          <Link
            href='/reset-password/inter-phone'
            className={styles.route_button_style}
          >
            Parolni unutdingizmi?
          </Link>
          <Link href='/register' className={styles.route_button_style}>
            Ro'yxatdan o'tish
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
