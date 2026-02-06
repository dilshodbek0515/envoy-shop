'use client'
import './register.css'
import { FC, useState } from 'react'
import Link from 'next/link'
import Button from 'apps/web/src/shared/ui/button/button'
import InputPhone from 'apps/web/src/shared/ui/input/InputPhone/InputPhone'
import MainInput from 'apps/web/src/shared/ui/input/MainInput/input'
import PasswordInput from 'apps/web/src/shared/ui/input/PasswordInput/PasswordInput'
import { useForm, Controller, Resolver } from 'react-hook-form'
import { RegisterFormData, registerSchema } from 'apps/schema/schema'
import { RegisterFn } from '../../../../../../../packages/api/register/register'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

type Role = 'seller' | 'buyer'

const Register: FC = () => {
  const [role, setRole] = useState<Role>('seller')
  const [isChange, setIsChange] = useState(false)
  const router = useRouter()
  const safeRegisterResolver: Resolver<RegisterFormData> = async values => {
    const result = registerSchema.safeParse(values)

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
    formState: { errors, isValid }
  } = useForm<RegisterFormData>({
    resolver: safeRegisterResolver,
    mode: 'onChange',
    defaultValues: {
      phone: '',
      email: '',
      password: '',
      confirm_password: ''
    }
  })

  const registerMutation = useMutation({
    mutationFn: (data: RegisterFormData) => {
      const fullData = {
        ...data,
        role: role === 'seller' ? 'seller' : 'buyer',
        phone: `+998${data.phone}`
      }
      return RegisterFn({ fullData })
    },
    onSuccess: () => {
      router.replace('/register/register-sms')
      localStorage.setItem('role', role)
    },
    onError: error => console.log('Register error:', error)
  })

  const onSubmit = async (data: RegisterFormData) => {
    registerMutation.mutate(data)
  }

  return (
    <div className='container'>
      <div className='register_box'>
        <h2 style={{ padding: 10 }} className='login_title'>
          Ro'yxatdan o'tish
        </h2>

        <div className='roleBox'>
          <div
            className={`seller_style ${role === 'seller' ? 'select_role' : ''}`}
            onClick={() => {
              setRole('seller')
              setIsChange(true)
            }}
          >
            Sotuvchi
          </div>

          <div
            className={`buyer_style ${role === 'buyer' ? 'select_role' : ''}`}
            onClick={() => {
              setRole('buyer')
              setIsChange(true)
            }}
          >
            Xaridor
          </div>
        </div>

        {/* FORM */}
        <form className='default_form' onSubmit={handleSubmit(onSubmit)}>
          {/* PHONE */}
          <div className='input_group'>
            <Controller
              name='phone'
              control={control}
              render={({ field: { onChange, value } }) => (
                <InputPhone
                  label='Telefon raqam'
                  value={value}
                  onChange={v => {
                    onChange(v)
                    setIsChange(true)
                  }}
                />
              )}
            />
            {errors.phone && (
              <div className='error_text'>{errors.phone.message}</div>
            )}
          </div>

          {/* EMAIL */}
          <div className='input_group'>
            <Controller
              name='email'
              control={control}
              render={({ field: { onChange, value } }) => (
                <MainInput
                  label='Elektron pochta'
                  value={value}
                  onChange={v => {
                    onChange(v)
                    setIsChange(true)
                  }}
                />
              )}
            />
            {errors.email && (
              <div className='error_text'>{errors.email.message}</div>
            )}
          </div>

          {/* PASSWORD */}
          <div className='input_group'>
            <Controller
              name='password'
              control={control}
              render={({ field: { onChange, value } }) => (
                <PasswordInput
                  label='Parol'
                  value={value}
                  onChange={v => {
                    onChange(v)
                    setIsChange(true)
                  }}
                />
              )}
            />
            {errors.password && (
              <div className='error_text'>{errors.password.message}</div>
            )}
          </div>

          {/* CONFIRM */}
          <div className='input_group'>
            <Controller
              name='confirm_password'
              control={control}
              render={({ field: { onChange, value } }) => (
                <PasswordInput
                  label='Qayta parol'
                  value={value}
                  onChange={v => {
                    onChange(v)
                    setIsChange(true)
                  }}
                />
              )}
            />
            {errors.confirm_password && (
              <div className='error_text'>
                {errors.confirm_password.message}
              </div>
            )}
          </div>

          <Button
            label={registerMutation.isPending ? 'Kutilmoqda...' : 'Davom etish'}
            type='submit'
            disabled={!isValid || registerMutation.isPending}
          />
        </form>

        {/* ROUTES */}
        <div className='route_bottom'>
          <Link href='/login' className='route_button_style'>
            <span className='acc'>Akkountingiz bormi? </span> Kirish
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register
