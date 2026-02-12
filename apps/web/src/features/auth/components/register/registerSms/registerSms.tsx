'use client'
import './registerSms.css'
import { FC, useEffect, useState } from 'react'
import Button from '../../../../../shared/ui/button/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { RegisterSmsFn } from '../../../../../../../../packages/api/register/register-sms'
import { RegisterFn } from '../../../../../../../../packages/api/register/register'
import SmsCodeInput from '../../../../../shared/ui/input/SmsCodeInput/SmsCodeInput'
<<<<<<< HEAD

=======
import styles from '../../../styles/auth.module.css'
>>>>>>> 92d0c4977ad75ba94125ce3eb5d0b74a6f584033
interface SmsFormData {
  code: string
}

const RegisterSms: FC = () => {
  const router = useRouter()
  const { handleSubmit, control, watch, setValue } = useForm<SmsFormData>({
    defaultValues: { code: '' }
  })

  const code = watch('code') || ''

  const [seconds, setSeconds] = useState<number>(0)

  // =============== TIMER INIT ===============
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

  // =============== TIMER TICK ===============
  useEffect(() => {
    if (seconds <= 0) return
    const id = setInterval(() => setSeconds(s => s - 1), 1000)
    return () => clearInterval(id)
  }, [seconds])

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0')
  const ss = String(seconds % 60).padStart(2, '0')

  const isExpired = seconds === 0

  // =============== VERIFY MUTATION ===============
  const verifyMutation = useMutation({
    mutationFn: RegisterSmsFn,
    onSuccess: () => {
      router.replace('/register/register-default')
    }
  })

  // =============== RESEND MUTATION ===============
  const resendMutation = useMutation({
    mutationFn: RegisterFn,
    onSuccess: res => {
      const exp = Number(res.expires_in) || 120
      localStorage.setItem('expires_in', String(exp))
      localStorage.setItem('expires_saved_at', String(Date.now()))
      setSeconds(exp)
      setValue('code', '') // input clear
    }
  })
<<<<<<< HEAD

  // =============== MAIN BUTTON HANDLER ===============
  const handleMainButton = (data: SmsFormData) => {
    if (!isExpired) {
      verifyMutation.mutate({
        phone: localStorage.getItem('register_phone') || '',
        code: data.code
      })
    } else {
      const rawPayload = localStorage.getItem('register_payload')
      if (!rawPayload) return
      resendMutation.mutate(JSON.parse(rawPayload))
    }
  }

  const mainLoading = verifyMutation.isPending || resendMutation.isPending
  const mainLabel = isExpired ? 'SMS ni qayta yuborish' : 'SMS ni tasdiqlash'
  const mainDisabled = isExpired
    ? resendMutation.isPending
    : code.length !== 4 || verifyMutation.isPending

  // =============== UI ===============
  return (
    <div className='container'>
      <div className='login_box'>
        <h2 className='login_title'>SMS tasdiqlash</h2>

        {!isExpired && (
          <p className='sms_timer'>
=======

  // =============== MAIN BUTTON HANDLER ===============
  const handleMainButton = (data: SmsFormData) => {
    if (!isExpired) {
      verifyMutation.mutate({
        phone: localStorage.getItem('register_phone') || '',
        code: data.code
      })
    } else {
      const rawPayload = localStorage.getItem('register_payload')
      if (!rawPayload) return
      resendMutation.mutate(JSON.parse(rawPayload))
    }
  }

  const mainLoading = verifyMutation.isPending || resendMutation.isPending
  const mainLabel = isExpired ? 'SMS ni qayta yuborish' : 'SMS ni tasdiqlash'
  const mainDisabled = isExpired
    ? resendMutation.isPending
    : code.length !== 4 || verifyMutation.isPending

  // =============== UI ===============
  return (
    <div className={styles.container}>
      <div className={styles.login_box}>
        <h2 className={styles.login_title}>SMS tasdiqlash</h2>

        {!isExpired && (
          <p>
>>>>>>> 92d0c4977ad75ba94125ce3eb5d0b74a6f584033
            Kod amal qilish vaqti:
            <b>
              {mm}:{ss}
            </b>
          </p>
        )}

<<<<<<< HEAD
        <form onSubmit={handleSubmit(handleMainButton)} className='sms_form'>
          <div className='input_group'>
=======
        <form
          onSubmit={handleSubmit(handleMainButton)}
          className={styles.sms_form}
        >
          <div className={styles.input_group}>
>>>>>>> 92d0c4977ad75ba94125ce3eb5d0b74a6f584033
            <Controller
              name='code'
              control={control}
              render={({ field }) => (
                <SmsCodeInput value={field.value} onChange={field.onChange} />
              )}
            />
          </div>

          <div className={styles.sms_button_container}>
            <Button
              type='submit'
              label={mainLabel}
              disabled={mainDisabled}
              loading={mainLoading}
            />
          </div>
        </form>

        <div className={styles.route_bottom}>
          <Link href='/login' className={styles.route_button_style}>
            <span>Akkountingiz bormi? Kirish</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RegisterSms
