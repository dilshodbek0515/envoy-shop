'use client'
import './reset-sms.css'
import { useMutation } from '@tanstack/react-query'
import Button from 'apps/web/src/shared/ui/button/button'
import MainInput from 'apps/web/src/shared/ui/input/MainInput/input'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { RegisterSmsFn } from 'packages/api/register/register-sms'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'

const ResetSms: FC = () => {
  const router = useRouter()
  const phone = localStorage.getItem('reset_phone') || ''

  const { handleSubmit, control, watch, formState } = useForm({
    mode: 'onChange',
    defaultValues: { code: '' }
  })

  const smsMutation = useMutation({
    mutationFn: RegisterSmsFn,
    onSuccess: () => {
      router.replace('/reset-password/change-password')
    }
  })

  const onSubmit = (data: any) => {
    smsMutation.mutate({
      phone,
      code: data.code
    })
  }

  return (
    <div className='container'>
      <div className='login_box'>
        <h2 className='login_title'>SMS tasdiqlash</h2>

        <form onSubmit={handleSubmit(onSubmit)} className='sms_form'>
          <div className='sms_input_container'>
            <div className='input_group'>
              <Controller
                name='code'
                control={control}
                render={({ field }) => (
                  <MainInput
                    label='SMS kod'
                    value={field.value}
                    onChange={value =>
                      field.onChange(value.replace(/\D/g, '').slice(0, 4))
                    }
                  />
                )}
              />
              {formState.errors.code && (
                <div className='error_text'>
                  {formState.errors.code.message}
                </div>
              )}
            </div>
          </div>

          <div className='sms_button_container'>
            <Button
              type='submit'
              label={
                smsMutation.isPending ? 'Kutilmoqda...' : 'SMS ni tasdiqlash'
              }
              disabled={watch('code').length !== 4 || smsMutation.isPending}
            />
          </div>
        </form>

        <div className='route_bottom'>
          <Link href='/login' className='route_button_style'>
            <span className='acc'>Akkountingiz bormi? </span> Kirish
          </Link>
          <p />
        </div>
      </div>
    </div>
  )
}

export default ResetSms
