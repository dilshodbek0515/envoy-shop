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
} from 'apps/schema/schema'
import PasswordInput from 'apps/web/src/shared/ui/input/PasswordInput/PasswordInput'
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
    <div className='container'>
      <div className='register_box'>
        <h2 className='login_title'>Ro'yxatdan o'tish</h2>

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
          <div className='input_group'>
            <Controller
              name='email'
              control={control}
              render={({ field }) => (
                <MainInput
                  label='Email (ixtiyoriy)'
                  value={field.value ?? ''}
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          {/* PASSWORD*/}
          <div className='input_group'>
            <Controller
              name='password'
              control={control}
              render={({ field }) => <PasswordInput label='Parol' {...field} />}
            />
            {formState.errors.password && (
              <div className='error_text'>
                {formState.errors.password.message}
              </div>
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div className='input_group'>
            <Controller
              name='confirm_password'
              control={control}
              render={({ field }) => (
                <PasswordInput label='Parolni tasdiqlash' {...field} />
              )}
            />
            {formState.errors.confirm_password && (
              <div className='error_text'>
                {formState.errors.confirm_password.message}
              </div>
            )}
          </div>

          <Button
            type='submit'
            label={registerMutation.isPending ? 'Kutilmoqda...' : 'Davom etish'}
            disabled={!formState.isValid || registerMutation.isPending}
          />
        </form>

        <div className='route_bottom'>
          <Link href='/login' className='route_button_style'>
            Akkountingiz bormi? Kirish
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RegisterDefault
