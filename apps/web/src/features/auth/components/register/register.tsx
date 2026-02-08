'use client'
import './register.css'
import { FC } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { useForm, Controller, Resolver } from 'react-hook-form'
import Button from 'apps/web/src/shared/ui/button/button'
import { registerSchema, RegisterFormData } from 'apps/schema/schema'
import InputPhone from 'apps/web/src/shared/ui/input/InputPhone/InputPhone'
import { RegisterFn } from '../../../../../../../packages/api/register/register'
import { getClientIp, getDeviceName } from '../../../../utils/device'

const Register: FC = () => {
  const router = useRouter()
  const device_name = getDeviceName()

  const safeResolver: Resolver<RegisterFormData> = async values => {
    const result = registerSchema.safeParse(values)

    if (result.success) {
      return { values: result.data, errors: {} }
    }

    const errors = result.error.flatten().fieldErrors

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

  const {
    handleSubmit,
    control,
    formState: { errors, isValid }
  } = useForm<RegisterFormData>({
    resolver: safeResolver,
    mode: 'onChange',
    defaultValues: { phone: '' }
  })

  const registerMutation = useMutation({
    mutationFn: RegisterFn,
    onSuccess: (_, data) => {
      localStorage.setItem('register_phone', data.phone)
      router.replace('/register/register-sms')
    },
    onError: err => console.log('OTP send error:', err)
  })

  const onSubmit = async (form: RegisterFormData) => {
    const ip = await getClientIp()
    const fullPhone = '+998' + form.phone
    registerMutation.mutate({
      phone: fullPhone,
      ip_address: ip,
      device_id: device_name,
      purpose: 'verify_phone'
    })
  }

  return (
    <div className='container'>
      <div className='register_box'>
        <h2 className='login_title'>Ro'yxatdan o'tish</h2>

        {/* FORM */}
        <form className='default_form' onSubmit={handleSubmit(onSubmit)}>
          {/* PHONE */}
          <div className='input_group'>
            <Controller
              name='phone'
              control={control}
              render={({ field }) => (
                <InputPhone
                  label='Telefon raqam'
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.phone && (
              <div className='error_text'>{errors.phone.message}</div>
            )}
          </div>

          <Button
            label={registerMutation.isPending ? 'Kutilmoqda...' : 'Davom etish'}
            type='submit'
            disabled={!isValid || registerMutation.isPending}
          />
        </form>

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
