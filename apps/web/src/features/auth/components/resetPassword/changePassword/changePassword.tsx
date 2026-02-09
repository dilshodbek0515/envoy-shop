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

const safeResolver: Resolver<ChangePasswordFormData> = async values => {
  const r = changePasswordSchema.safeParse(values)

  if (r.success) {
    return { values: r.data, errors: {} }
  }

  const errors = r.error.flatten().fieldErrors

  return {
    values,
    errors: Object.fromEntries(
      Object.entries(errors).map(([k, v]) => [
        k,
        { type: 'validation', message: v?.[0] }
      ])
    )
  }
}

const ChangePassword: FC = () => {
  const router = useRouter()

  const {
    watch,
    control,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<ChangePasswordFormData>({
    resolver: safeResolver,
    mode: 'onChange',
    defaultValues: {
      firstPassword: '',
      secondPassword: ''
    }
  })

  const passwordMutation = useMutation({
    mutationFn: PasswordFn,
    onSuccess: () => {
      localStorage.removeItem('reset_phone')
      router.replace('/login')
    },
    onError: err => {
      console.log('Password change error:', err)
    }
  })

  const p1 = watch('firstPassword') || ''
  const p2 = watch('secondPassword') || ''

  const passwordsMatch = p1 === p2
  const ready = p1.length >= 8 && p2.length >= 8 && passwordsMatch && isValid

  const onSubmit = (data: ChangePasswordFormData) => {
    passwordMutation.mutate({
      password: data.firstPassword
    })
  }

  return (
    <div className='container'>
      <div className='login_box'>
        <h2 className='login_title'>Parolni o'zgartirish</h2>

        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          {/* PASSWORD */}
          <div className='input_group'>
            <Controller
              name='firstPassword'
              control={control}
              render={({ field }) => (
                <PasswordInput label='Yangi parol' {...field} />
              )}
            />
            {errors.firstPassword && (
              <div className='error_text'>{errors.firstPassword.message}</div>
            )}
          </div>

          {/* CONFIRM PASSWORD*/}
          <div className='input_group'>
            <Controller
              name='secondPassword'
              control={control}
              render={({ field }) => (
                <PasswordInput label='Parolni takrorlang' {...field} />
              )}
            />
            {errors.secondPassword && (
              <div className='error_text'>{errors.secondPassword.message}</div>
            )}
          </div>

          <Button
            type='submit'
            label={
              passwordMutation.isPending
                ? 'Saqlanmoqda...'
                : 'Parolni yangilash'
            }
            disabled={!ready || passwordMutation.isPending}
          />
        </form>

        <div className='route_bottom'>
          <Link href='/login' className='route_button_style'>
            Kirish
          </Link>
          <Link href='/register' className='route_button_style'>
            Ro'yxatdan o'tish
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword
