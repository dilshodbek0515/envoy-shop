'use client'
import { FC } from 'react'
import './registerFull.css'
import Link from 'next/link'
import { Controller, Resolver, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Button from 'apps/web/src/shared/ui/button/button'
import {
  SellerFullFormData,
  sellerFullSchema
} from '../../../../../../../../packages/schema/schema-full-schema'
import { SellerInformationFn } from '../../../../../../../../packages/api/register/register-full'
import { useMutation } from '@tanstack/react-query'
import MainInput from 'apps/web/src/shared/ui/input/MainInput/input'
import CustomSelect from 'apps/web/src/shared/ui/select/select'
import styles from '../../../styles/auth.module.css'

const companyTypeOptions = [
  'YaTT',
  "Fermer Xo'jaligi",
  "Dexqon Xo'jaligi",
  "Shirkat Xo'jaligi",
  'MCHJ',
  'Xususiy korxona',
  'Unitar korxona',
  "Qo'shma korxona",
  'Oilaviy korxona',
  'Boshqa'
].map(v => ({ value: v, label: v }))

const Login: FC = () => {
  const router = useRouter()

  const sellerFullResolver: Resolver<SellerFullFormData> = async values => {
    const result = sellerFullSchema.safeParse(values)

    if (result.success) {
      return {
        values: result.data,
        errors: {}
      }
    }

    const fieldErrors = result.error.flatten().fieldErrors

    return {
      values: {},
      errors: Object.fromEntries(
        Object.entries(fieldErrors).map(([key, messages]) => [
          key,
          {
            type: 'validation',
            message: messages?.[0]
          }
        ])
      )
    }
  }

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isValid }
  } = useForm<SellerFullFormData>({
    resolver: sellerFullResolver,
    mode: 'onChange',
    defaultValues: {
      first_name: '',
      last_name: '',
      type: 'individual',
      company_name: '',
      inn: '',
      company_type: '',
      address: ''
    }
  })

  const typeValue = watch('type')

  const mutation = useMutation({
    mutationFn: SellerInformationFn,
    onSuccess: () => {
      router.replace('/login')
    },
    onError: e => console.log('SELLER ERROR:', e)
  })

  const onSubmit = (data: SellerFullFormData) => {
    console.log('SUBMIT:', data)
    mutation.mutate(data)
  }

  return (
    <div className={styles.container}>
      <div className={styles.login_box}>
        <h2 className={styles.login_title}>Ro'yxatdan o'tish</h2>
        <div className='type_switch'>
          <button
            type='button'
            className={`type_btn ${typeValue === 'individual' ? 'active' : ''}`}
            onClick={() =>
              setValue('type', 'individual', { shouldValidate: true })
            }
          >
            Jismoniy
          </button>

          <button
            type='button'
            className={`type_btn ${typeValue === 'company' ? 'active' : ''}`}
            onClick={() =>
              setValue('type', 'company', { shouldValidate: true })
            }
          >
            Yuridik
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          {/* TYPE */}
          <Controller
            name='type'
            control={control}
            render={({ field }) => <input type='hidden' {...field} />}
          />

          {/* FIRST NAME */}
          <div className={styles.input_group}>
            <Controller
              name='first_name'
              control={control}
              render={({ field, fieldState }) => (
                <MainInput
                  label='Ism'
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.invalid}
                />
              )}
            />
            {errors.first_name && (
              <p className={styles.error_text}>{errors.first_name.message}</p>
            )}
          </div>

          {/* LAST NAME */}
          <div className={styles.input_group}>
            <Controller
              name='last_name'
              control={control}
              render={({ field, fieldState }) => (
                <MainInput
                  label='Familiya'
                  value={field.value ?? ''}
                  onChange={field.onChange}
                  error={fieldState.invalid}
                />
              )}
            />
            {errors.last_name && (
              <p className={styles.error_text}>{errors.last_name.message}</p>
            )}
          </div>
          {/* COMPANY TYPE */}
          <div className={styles.input_group}>
            <Controller
              name='company_type'
              control={control}
              render={({ field }) => (
                <CustomSelect
                  label='Faoliyat turi'
                  value={field.value}
                  onChange={field.onChange}
                  options={companyTypeOptions}
                  error={errors.company_type?.message}
                />
              )}
            />
          </div>

          {/* COMPANY NAME */}
          <div className={styles.input_group}>
            <Controller
              name='company_name'
              control={control}
              render={({ field, fieldState }) => (
                <MainInput
                  label='Korxona nomi'
                  value={field.value ?? ''}
                  onChange={field.onChange}
                  error={fieldState.invalid}
                />
              )}
            />
            {errors.company_name && (
              <p className={styles.error_text}>{errors.company_name.message}</p>
            )}
          </div>

          {/* INN */}
          <div className={styles.input_group}>
            <Controller
              name='inn'
              control={control}
              render={({ field, fieldState }) => (
                <MainInput
                  label='INN'
                  value={field.value ?? ''}
                  onChange={field.onChange}
                  error={fieldState.invalid}
                />
              )}
            />
            {errors.inn && (
              <p className={styles.error_text}>{errors.inn.message}</p>
            )}
          </div>

          {/* ADDRESS */}
          <div className={styles.input_group}>
            <Controller
              name='address'
              control={control}
              render={({ field, fieldState }) => (
                <MainInput
                  label='Manzil'
                  value={field.value ?? ''}
                  onChange={field.onChange}
                  error={fieldState.invalid}
                />
              )}
            />
            {errors.address && (
              <p className={styles.error_text}>{errors.address.message}</p>
            )}
          </div>

          <Button
            type='submit'
            label="Ro'yxatdan o'tish"
            disabled={!isValid}
            loading={mutation.isPending}
          />
        </form>

        <div className={styles.route_bottom}>
          <Link href='/login' className={styles.route_button_style}>
            Alkkountingiz bormi? Kirish
          </Link>
          <p />
        </div>
      </div>
    </div>
  )
}

export default Login
