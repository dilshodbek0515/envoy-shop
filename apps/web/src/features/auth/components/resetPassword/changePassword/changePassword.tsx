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
} from '../../../../../../../../packages/schema/schema'
import styles from '../../../styles/auth.module.css'

const ChangePassword: FC = () => {
  const router = useRouter()

  const safeResolver: Resolver<ChangePasswordFormData> = async values => {
    const result = changePasswordSchema.safeParse(values)

    if (result.success) {
      return {
        values: result.data,
        errors: {}
      }
    }

    const fieldErrors = result.error.flatten().fieldErrors

    return {
      values: {},
      errors: Object.fromEntries(
        Object.entries(fieldErrors).map(([key, val]) => [
          key,
          {
            type: 'validation',
            message: val?.[0]
          }
        ])
      )
    }
  }

  const {
    control,
    handleSubmit,
    watch,
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

  const ready = p1.length >= 8 && p2.length >= 8 && isValid

  const onSubmit = (data: ChangePasswordFormData) => {
    passwordMutation.mutate({
      password: data.firstPassword
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.login_box}>
        <h2 className={styles.login_title}>Parolni o'zgartirish</h2>

        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          {/* PASSWORD */}
          <div className={styles.input_group}>
            <Controller
              name='firstPassword'
              control={control}
              render={({ field, fieldState }) => (
                <PasswordInput
                  label='Yangi parol'
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.invalid}
                />
              )}
            />
            {errors.firstPassword && (
              <div className={styles.error_text}>
                {errors.firstPassword.message}
              </div>
            )}
          </div>

          {/* CONFIRM PASSWORD*/}
          <div className={styles.input_group}>
            <Controller
              name='secondPassword'
              control={control}
              render={({ field, fieldState }) => (
                <PasswordInput
                  label='Parolni takrorlang'
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.invalid}
                />
              )}
            />
            {errors.secondPassword && (
              <div className={styles.error_text}>
                {errors.secondPassword.message}
              </div>
            )}
          </div>

          <Button
            type='submit'
            label='Parolni yangilash'
            disabled={!ready}
            loading={passwordMutation.isPending}
          />
        </form>

        <div className={styles.route_bottom}>
          <Link href='/login' className={styles.route_button_style}>
            Kirish
          </Link>
          <Link href='/register' className={styles.route_button_style}>
            Ro'yxatdan o'tish
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword
