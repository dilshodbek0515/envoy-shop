'use client'
import './registerSecond.css'
import { FC } from 'react'
import Link from 'next/link'
import Button from 'apps/web/src/shared/ui/button/button'
import MainInput from 'apps/web/src/shared/ui/input/MainInput/input'
import { useForm, Controller, Resolver } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { RegisterSecondFn } from 'packages/api/register/registerSecond'
import { sellerProfileSchema, SellerProfileData } from 'apps/schema/schema'
import CustomSelect from 'apps/web/src/shared/ui/select/select'

const Register: FC = () => {
  const router = useRouter()

  const safeResolver: Resolver<SellerProfileData> = async values => {
    const r = sellerProfileSchema.safeParse(values)

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

  const typeOption = [
    { value: 'individual', label: 'individual' },
    { value: 'company', label: 'company' }
  ]

  const option = [
    { label: 'yatt', value: 'YaTT' },
    { label: 'fermer', value: "Fermer Xo'jaligi" },
    { label: 'dehqon', value: "Dexqon Xo'jaligi" },
    { label: 'shirkat', value: "Shirkat Xo'jaligi" },
    { label: 'mchj', value: 'MCHJ' },
    { label: 'xususiy', value: 'Xususiy korxona' },
    { label: 'unitar', value: 'Unitar korxona' },
    { label: 'qoshma', value: "Qo'shma korxona" },
    { label: 'oilaviy', value: 'Oilaviy korxona' },
    { label: 'boshqa', value: 'Boshqa' }
  ]

  const { handleSubmit, control, formState } = useForm<SellerProfileData>({
    resolver: safeResolver,
    mode: 'onChange',
    defaultValues: {
      first_name: '',
      last_name: '',
      type: '',
      company_type: '',
      company_name: '',
      inn: '',
      address: ''
    }
  })

  const registerMutation = useMutation({
    mutationFn: RegisterSecondFn,
    onSuccess: () => router.replace('/'),
    onError: error => console.log(error)
  })

  const onSubmit = (data: SellerProfileData) => {
    registerMutation.mutate(data)
    console.log(data)
  }

  return (
    <div className='container'>
      <div className='register_box'>
        <h2 className='login_title'>Sotuvchi ma’lumotlari</h2>

        <form className='default_form' onSubmit={handleSubmit(onSubmit)}>
          {/* FIRST NAME */}
          <div className='input_group'>
            <Controller
              name='first_name'
              control={control}
              render={({ field }) => <MainInput label='Ism' {...field} />}
            />
            {formState.errors.first_name && (
              <div className='error_text'>
                {formState.errors.first_name.message}
              </div>
            )}
          </div>

          {/* LAST NAME */}
          <div className='input_group'>
            <Controller
              name='last_name'
              control={control}
              render={({ field }) => <MainInput label='Familiya' {...field} />}
            />
          </div>

          {/* COMPANY TYPE DROPDOWN */}
          <div className='input_group'>
            <Controller
              name='company_type'
              control={control}
              render={({ field }) => (
                <CustomSelect
                  label='Faoliyat turi'
                  value={field.value}
                  onChange={field.onChange}
                  options={option}
                  error={formState.errors.company_type?.message}
                />
              )}
            />
          </div>

          {/* TYPE DROPDOWN */}
          <div className='input_group'>
            <Controller
              name='type'
              control={control}
              render={({ field }) => (
                <CustomSelect
                  label='Shaxs turi'
                  value={field.value}
                  onChange={field.onChange}
                  options={typeOption}
                  error={formState.errors.type?.message}
                />
              )}
            />
          </div>

          {/* COMPANY NAME */}
          <div className='input_group'>
            <Controller
              name='company_name'
              control={control}
              render={({ field }) => (
                <MainInput label='Korxona nomi' {...field} />
              )}
            />
          </div>

          {/* INN NUMBER */}
          <div className='input_group'>
            <Controller
              name='inn'
              control={control}
              render={({ field }) => (
                <MainInput
                  label='STIR'
                  value={field.value}
                  onChange={v => field.onChange(v.replace(/\D/g, ''))}
                />
              )}
            />
          </div>

          {/* ADDRESS */}
          <div className='input_group'>
            <Controller
              name='address'
              control={control}
              render={({ field }) => <MainInput label='Manzil' {...field} />}
            />
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

export default Register
