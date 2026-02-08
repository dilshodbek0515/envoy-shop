'use client'
import './interPhone.css'
import Link from 'next/link'
import { FC } from 'react'
import { useRouter } from 'next/navigation'
import Button from '../../../../../shared/ui/button/button'
import InputPhone from '../../../../../shared/ui/input/InputPhone/InputPhone'
import { SmsFn } from '../../../../../../../../packages/api/resetPassword/reset-password'
import { useForm, Controller, Resolver } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import {
  interPhoneSchema,
  InterPhoneFormData
} from '../../../../../../../schema/schema'

const InterPhone: FC = () => {
  const router = useRouter()

  const resolver: Resolver<InterPhoneFormData> = async values => {
    const result = interPhoneSchema.safeParse(values)

    if (result.success) {
      return { values: result.data, errors: {} }
    }

    const errors = result.error.flatten().fieldErrors

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

  const { handleSubmit, control, watch, reset, formState } =
    useForm<InterPhoneFormData>({
      resolver,
      mode: 'onChange',
      defaultValues: {
        phone: ''
      }
    })

  const phoneValue = watch('phone') || ''

  const smsMutation = useMutation({
    mutationFn: (phone: string) => SmsFn({ phone: `+998${phone}` }),

    onSuccess: res => {
      console.log('onSuccess res:', res)

      if (res.message === true) {
        router.push('/reset-password/change-password')
      } else {
        reset()
      }
    },

    onError: err => console.log('SMS xato:', err)
  })

  const onSubmit = (data: InterPhoneFormData) => {
    smsMutation.mutate(data.phone)
  }

  const disabled =
    phoneValue.length !== 9 || smsMutation.isPending || !formState.isValid

  return (
    <div className='container'>
      <div className='login_box'>
        <h2 className='login_title'>Parolni tiklash</h2>

        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          <div className='input_group'>
            <Controller
              name='phone'
              control={control}
              render={({ field }) => (
                <InputPhone
                  label='Telefon raqam'
                  value={field.value || ''}
                  onChange={value => {
                    const numbers = value.replace(/\D/g, '').slice(0, 9)
                    field.onChange(numbers)
                  }}
                />
              )}
            />
            {formState.errors.phone && (
              <div className='error_text'>{formState.errors.phone.message}</div>
            )}
          </div>

          <Button
            type='submit'
            label={smsMutation.isPending ? 'Kutilmoqda...' : 'SMS yuborish'}
            disabled={disabled}
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

export default InterPhone
