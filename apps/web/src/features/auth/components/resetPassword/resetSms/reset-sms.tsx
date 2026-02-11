'use client'
import './reset-sms.css'
import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import Button from 'apps/web/src/shared/ui/button/button'
import SmsCodeInput from 'apps/web/src/shared/ui/input/SmsCodeInput/SmsCodeInput'
import { RegisterSmsFn } from 'packages/api/register/register-sms'
import Link from 'next/link'

interface SmsFormData {
  code: string
}

const ResetSms: FC = () => {
  const router = useRouter()
  const phone = localStorage.getItem('reset_phone') || ''
  const { handleSubmit, control, watch, setValue } = useForm<SmsFormData>({
    defaultValues: { code: '' }
  })

  const code = watch('code') || ''
  const [seconds, setSeconds] = useState<number>(0)

  // ================= TIMER INIT =================
  useEffect(() => {
    if (typeof window === 'undefined') return

    const expiresIn = Number(localStorage.getItem('expires_in') || '120')
    const savedAt = Number(
      localStorage.getItem('expires_saved_at') || Date.now()
    )
    const passed = Math.floor((Date.now() - savedAt) / 1000)
    const remain = Math.max(expiresIn - passed, 0)
    setSeconds(remain)
  }, [])

  // ================= TIMER TICK =================
  useEffect(() => {
    if (seconds <= 0) return
    const id = setInterval(() => setSeconds(s => s - 1), 1000)
    return () => clearInterval(id)
  }, [seconds])

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0')
  const ss = String(seconds % 60).padStart(2, '0')
  const isExpired = seconds === 0

  // ================= VERIFY MUTATION =================
  const verifyMutation = useMutation({
    mutationFn: (data: { phone: string; code: string }) => RegisterSmsFn(data),
    onSuccess: () => {
      router.replace('/reset-password/change-password')
    }
  })

  // ================= RESEND MUTATION =================
  const resendMutation = useMutation({
    mutationFn: (data: { phone: string; code: string }) => RegisterSmsFn(data),
    onSuccess: () => {
      const exp = 120
      localStorage.setItem('expires_in', String(exp))
      localStorage.setItem('expires_saved_at', String(Date.now()))
      setSeconds(exp)
      setValue('code', '') // input clear
    }
  })

  // ================= MAIN BUTTON HANDLER =================
  const handleMainButton = (data: SmsFormData) => {
    if (!isExpired) {
      verifyMutation.mutate({ phone, code: data.code })
    } else {
      resendMutation.mutate({ phone, code: '' })
    }
  }

  const mainLoading = verifyMutation.isPending || resendMutation.isPending
  const mainLabel = isExpired ? 'SMS ni qayta yuborish' : 'SMS ni tasdiqlash'
  const mainDisabled = isExpired
    ? resendMutation.isPending
    : code.length !== 4 || verifyMutation.isPending

  return (
    <div className='container'>
      <div className='login_box'>
        <h2 className='login_title'>SMS tasdiqlash</h2>

        {!isExpired && (
          <p className='sms_timer'>
            Kod amal qilish vaqti:
            <b>
              {mm}:{ss}
            </b>
          </p>
        )}

        <form onSubmit={handleSubmit(handleMainButton)} className='sms_form'>
          <div className='input_group'>
            <Controller
              name='code'
              control={control}
              render={({ field }) => (
                <SmsCodeInput
                  value={field.value}
                  onChange={value =>
                    field.onChange(value.replace(/\D/g, '').slice(0, 4))
                  }
                />
              )}
            />
          </div>

          <div className='sms_button_container'>
            <Button
              type='submit'
              label={mainLabel}
              disabled={mainDisabled}
              loading={mainLoading}
            />
          </div>
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

export default ResetSms
