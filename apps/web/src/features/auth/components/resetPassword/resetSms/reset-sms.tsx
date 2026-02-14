'use client'
import './reset-sms.css'
import { FC } from 'react'
import Link from 'next/link'
import styles from '../../../styles/auth.module.css'
import Button from 'apps/web/src/shared/ui/button/button'
import SmsCodeInput from 'apps/web/src/shared/ui/input/SmsCodeInput/SmsCodeInput'
import { Controller, useForm } from 'react-hook-form'
import { RegisterSmsFn } from 'packages/api/register/register-sms'
import { useRouter } from 'next/navigation'

type CodeT = {
  code: string
}

const ResetSms: FC = () => {
  const router = useRouter()
  const {
    control,
    formState: { errors },
    handleSubmit
  } = useForm<CodeT>({
    defaultValues: {
      code: ''
    }
  })

  const onSubmit = (dataa: CodeT) => {
    const phone = localStorage.getItem('reset_phone')
    const access_token = localStorage.getItem('access_token')
    const data = { phone, ...dataa }
    RegisterSmsFn(data)
    console.log(data)
    if (access_token) {
      router.replace('reset-password/change-password')
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.login_box}>
        <h2 className={styles.login_title}>SMS tasdiqlash</h2>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.sms_form}>
          <div className={styles.input_group}>
            <Controller
              name='code'
              control={control}
              render={({ field }) => (
                <SmsCodeInput value={field.value} onChange={field.onChange} />
              )}
            />
          </div>

          <div className={styles.sms_button_container}>
            <Button type='submit' label={'Davom etish'} />
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

export default ResetSms
