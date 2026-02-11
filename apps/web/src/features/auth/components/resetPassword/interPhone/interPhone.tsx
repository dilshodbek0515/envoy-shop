'use client'
import './interPhone.css'
import '../../../styles/auth.module.css'
import Link from 'next/link'
import { FC } from 'react'
import { useRouter } from 'next/navigation'
import Button from '../../../../../shared/ui/button/button'
import InputPhone from '../../../../../shared/ui/input/InputPhone/InputPhone'
import { useForm, Controller, Resolver } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import {
  RegisterFormData,
  registerSchema
} from '../../../../../../../../packages/schema/schema'
import { RegisterFn } from 'packages/api/register/register'
import { getClientIp, getDeviceId } from 'apps/web/src/utils/device'
import styles from '../../../styles/auth.module.css'
const InterPhone: FC = () => {
  const router = useRouter()
  const device_name = getDeviceId()

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
    reset,
    formState: { errors, isValid }
  } = useForm<RegisterFormData>({
    resolver: safeResolver,
    mode: 'onChange',
    defaultValues: { phone: '' }
  })

  const smsMutation = useMutation({
    mutationFn: RegisterFn,
    onSuccess: (res, variables) => {
      localStorage.setItem('reset_phone', variables.phone)
      console.log(res, variables)

      if (res.message === 'Reset code sent') {
        router.replace('/reset-password/reset-sms')
      } else reset()
    },
    onError: err => {
      console.log('Reset SMS error:', err), reset()
    }
  })

  const onSubmit = async (form: RegisterFormData) => {
    const ip = await getClientIp()
    const fullPhone = '+998' + form.phone
    smsMutation.mutate({
      phone: fullPhone,
      ip_address: ip,
      device_id: device_name,
      purpose: 'reset_password'
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.login_box}>
        <h2 className={styles.login_title}>Parolni tiklash</h2>

        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          <div className={styles.input_group}>
            <Controller
              name='phone'
              control={control}
              render={({ field, fieldState }) => (
                <InputPhone
                  label='Telefon raqam'
                  value={field.value}
                  onChange={value => {
                    const numbers = value.replace(/\D/g, '').slice(0, 9)
                    field.onChange(numbers)
                  }}
                  error={fieldState.invalid}
                />
              )}
            />
            {errors.phone && (
              <div className={styles.error_text}>{errors.phone.message}</div>
            )}
          </div>

          <Button
            type='submit'
            label='SMS yuborish'
            disabled={!isValid}
            loading={smsMutation.isPending}
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

export default InterPhone
