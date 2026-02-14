'use client'
import './registerDefault.css'
import { FC } from 'react'
import Link from 'next/link'
import Button from 'apps/web/src/shared/ui/button/button'
import MainInput from 'apps/web/src/shared/ui/input/MainInput/input'
import { useForm, Controller, Resolver } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { RegisterDefaultFn } from '../../../../../../../../packages/api/register/register-default'
import {
  RegisterDefaultFormData,
  registerDefaultSchema
} from '../../../../../../../../packages/schema/register-default-schema'
import PasswordInput from 'apps/web/src/shared/ui/input/PasswordInput/PasswordInput'
import styles from '../../../styles/auth.module.css'

const RegisterDefault: FC = () => {
  const router = useRouter()

  const safeResolver: Resolver<RegisterDefaultFormData> = async values => {
    const r = registerDefaultSchema.safeParse(values)

    if (r.success) return { values: r.data, errors: {} }

    const errors = r.error.flatten().fieldErrors

    return {
      values: {},
      errors: Object.fromEntries(
        Object.entries(errors).map(([k, v]) => [
          k,
          { type: 'validation', message: v?.[0] }
        ])
      )
    }
  }

  const { handleSubmit, control, watch, setValue, formState } =
    useForm<RegisterDefaultFormData>({
      resolver: safeResolver,
      mode: 'onChange',
      defaultValues: {
        role: 'seller',
        email: '',
        password: '',
        confirm_password: ''
      }
    })

  const roleValue = watch('role')

  const registerMutation = useMutation({
    mutationFn: RegisterDefaultFn,
    onSuccess: (_res, data) => {
      if (data.role === 'buyer') {
        router.replace('/')
      } else if (data.role === 'seller') {
        router.replace('/register/register-full')
      }
    }
  })

  const onSubmit = (data: RegisterDefaultFormData) => {
    registerMutation.mutate({
      role: data.role,
      password: data.password,
      email: data.email || undefined
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.login_box}>
        <h2 className={styles.login_title}>Ro'yxatdan o'tish</h2>

        <div className='role_switch'>
          <button
            type='button'
            className={`role_btn ${roleValue === 'seller' ? 'active' : ''}`}
            onClick={() => setValue('role', 'seller', { shouldValidate: true })}
          >
            Sotuvchi
          </button>
          <button
            type='button'
            className={`role_btn ${roleValue === 'buyer' ? 'active' : ''}`}
            onClick={() => setValue('role', 'buyer', { shouldValidate: true })}
          >
            Xaridor
          </button>
        </div>

        <form className='default_form' onSubmit={handleSubmit(onSubmit)}>
          {/* ROLE */}
          <Controller
            name='role'
            control={control}
            render={({ field }) => <input type='hidden' {...field} />}
          />

          {/* EMAIL */}
          <div className={styles.input_group}>
            <Controller
              name='email'
              control={control}
              render={({ field, fieldState }) => (
                <MainInput
                  label='Email (ixtiyoriy)'
                  value={field.value ?? ''}
                  onChange={field.onChange}
                  error={fieldState.invalid}
                />
              )}
            />
          </div>

          {/* PASSWORD*/}
          <div className={styles.input_group}>
            <Controller
              name='password'
              control={control}
              render={({ field, fieldState }) => (
                <PasswordInput
                  label='Parol'
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.invalid}
                />
              )}
            />
            {formState.errors.password && (
              <div className={styles.error_text}>
                {formState.errors.password.message}
              </div>
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div className={styles.input_group}>
            <Controller
              name='confirm_password'
              control={control}
              render={({ field, fieldState }) => (
                <PasswordInput
                  label='Parolni tasdiqlash'
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.invalid}
                />
              )}
            />
            {formState.errors.confirm_password && (
              <div className={styles.error_text}>
                {formState.errors.confirm_password.message}
              </div>
            )}
          </div>

          <Button
            type='submit'
            label='Davom etish'
            disabled={!formState.isValid}
            loading={registerMutation.isPending}
          />
        </form>

        <div className={styles.route_bottom}>
          <Link href='/login' className={styles.route_button_style}>
            Akkountingiz bormi? Kirish
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RegisterDefault
