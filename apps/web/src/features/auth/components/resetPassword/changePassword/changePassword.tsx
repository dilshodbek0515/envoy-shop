'use client'
import Link from 'next/link'
import './changePassword.css'
import { FC } from 'react'
import Button from '../../../../../shared/ui/button/button'
import PasswordInput from 'apps/web/src/shared/ui/input/PasswordInput/PasswordInput'
import { PasswordFn } from '../../../../../../../../packages/api/resetPassword/change-password'
import { useRouter } from 'next/navigation'
import { useForm, Controller, Resolver } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import {
  changePasswordSchema,
  ChangePasswordFormData
} from '../../../../../../../schema/schema'

// ✅ Safe Zod resolver (login faylidagi kabi)
const safeZodResolver: Resolver<ChangePasswordFormData> = async values => {
  const result = changePasswordSchema.safeParse(values)

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

const ChangePassword: FC = () => {
  const router = useRouter()

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    watch
  } = useForm<ChangePasswordFormData>({
    resolver: safeZodResolver,
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
    onSuccess: () => router.push('/Login'),
    onError: (error: any) => console.log('Ishlamadi', error)
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

  // ✅ Parollarni solishtirish
  const passwordsMatch = firstPasswordValue === secondPasswordValue
  const isFormValid =
    firstPasswordValue.length >= 8 &&
    secondPasswordValue.length >= 8 &&
    passwordsMatch

  return (
    <div className='container'>
      <div className='login_box'>
        <h2 className='login_title'>Parolni o'zgartirish</h2>

        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          {/* Birinchi parol */}
          <div className='input_group'>
            <Controller
              name='firstPassword'
              control={control}
              render={({ field }) => (
                <PasswordInput
                  label='Yangi parol'
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              )}
            />
            {errors.firstPassword && firstPasswordValue.length > 0 && (
              <div className='error_text'>{errors.firstPassword.message}</div>
            )}
          </div>

          {/* Ikkinchi parol */}
          <div className='input_group'>
            <Controller
              name='secondPassword'
              control={control}
              render={({ field }) => (
                <PasswordInput
                  label='Yangi parolni takrorlang'
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
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
          <Link href='/Login'>➡️</Link>
          <Link href='/Register' className='route_button_style'>
            Ro'yxatdan o'tish
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword
