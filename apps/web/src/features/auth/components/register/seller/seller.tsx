'use client'
import './seller.css'
import MainInput from '../../../../../shared/ui/input/MainInput/input'
import { FC } from 'react'
import InputPhone from '../../../../../shared/ui/input/InputPhone/InputPhone'
import CustomSelect from '../../../../../shared/ui/select/select'
import Button from '../../../../../shared/ui/button/button'
import { RegisterFn } from '../../../../../../../../packages/api/register/register'
import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import PasswordInput from 'apps/web/src/shared/ui/input/PasswordInput/PasswordInput'

interface SellerProps {
  role: 'seller' | 'buyer'
}

// Yuridik schema
const legalSchema = z
  .object({
    firstName: z.string().min(2, "Ism kamida 2 ta belgi bo'lsin"),
    lastName: z.string().min(2, "Familiya kamida 2 ta belgi bo'lsin"),
    stir: z
      .string()
      .length(9, "STIR 9 ta raqam bo'lsin")
      .regex(/^\d+$/, 'Faqat raqamlar kiriting'),
    activityType: z.string().min(1, 'Faoliyat turini tanlang'),
    companyName: z.string().min(3, "Korxona nomi kamida 3 ta belgi bo'lsin"),
    legalAddress: z.string().min(5, "Yuridik manzil kamida 5 ta belgi bo'lsin"),
    bankDetails: z
      .string()
      .min(20, "Bank rekvizitlari kamida 20 ta belgi bo'lsin"),
    phoneNumber: z
      .string()
      .length(9, "Telefon raqam 9 ta bo'lsin")
      .regex(/^\d+$/, 'Faqat raqamlar kiriting'),
    password: z.string().min(8, "Parol kamida 8 ta belgi bo'lsin"),
    confirmPassword: z.string()
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Parollar mos kelmayapti',
    path: ['confirmPassword']
  })

// Jismoniy schema
const physicalSchema = z
  .object({
    firstNamePhysical: z.string().min(2, "Ism kamida 2 ta belgi bo'lsin"),
    lastNamePhysical: z.string().min(2, "Familiya kamida 2 ta belgi bo'lsin"),
    phoneNumberPhysical: z
      .string()
      .length(9, "Telefon raqam 9 ta bo'lsin")
      .regex(/^\d+$/, 'Faqat raqamlar kiriting'),
    emailPhysical: z.string().email("Noto'g'ri email format"),
    passwordPhysical: z.string().min(8, "Parol kamida 8 ta belgi bo'lsin"),
    confirmPasswordPhysical: z.string()
  })
  .refine(data => data.passwordPhysical === data.confirmPasswordPhysical, {
    message: 'Parollar mos kelmayapti',
    path: ['confirmPasswordPhysical']
  })

type LegalFormData = z.infer<typeof legalSchema>
type PhysicalFormData = z.infer<typeof physicalSchema>

const Seller: FC<SellerProps> = ({ role }) => {
  const [sellerRole, setSellerRole] = useState<'legal' | 'physical'>('legal')
  const router = useRouter()

  // Yuridik form
  const {
    control: legalControl,
    handleSubmit: handleLegalSubmit,
    formState: { errors: legalErrors, isValid: legalIsValid },
    watch: legalWatch
  } = useForm<LegalFormData>({
    resolver: zodResolver(legalSchema),
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      stir: '',
      activityType: '',
      companyName: '',
      legalAddress: '',
      bankDetails: '',
      phoneNumber: '',
      password: '',
      confirmPassword: ''
    }
  })

  // Jismoniy form
  const {
    control: physicalControl,
    handleSubmit: handlePhysicalSubmit,
    formState: { errors: physicalErrors, isValid: physicalIsValid },
    watch: physicalWatch
  } = useForm<PhysicalFormData>({
    resolver: zodResolver(physicalSchema),
    mode: 'onChange',
    defaultValues: {
      firstNamePhysical: '',
      lastNamePhysical: '',
      phoneNumberPhysical: '',
      emailPhysical: '',
      passwordPhysical: '',
      confirmPasswordPhysical: ''
    }
  })

  const registerMutation = useMutation({
    mutationFn: (data: any) => RegisterFn({ registrationData: data }),
    onSuccess: () => {
      router.push('/Register/RegisterSms')
    },
    onError: (error: any) => {
      console.log('Ishlamadi', error)
    }
  })

  // Watch values
  const legalFirstName = legalWatch('firstName') || ''
  const legalPassword = legalWatch('password') || ''
  const legalConfirmPassword = legalWatch('confirmPassword') || ''
  const physicalFirstName = physicalWatch('firstNamePhysical') || ''
  const physicalPassword = physicalWatch('passwordPhysical') || ''
  const physicalConfirmPassword = physicalWatch('confirmPasswordPhysical') || ''

  const onLegalSubmit = (data: LegalFormData) => {
    if (legalIsValid) {
      registerMutation.mutate({ role: 'legal', userType: role, ...data })
    }
  }

  const onPhysicalSubmit = (data: PhysicalFormData) => {
    if (physicalIsValid) {
      registerMutation.mutate({ role: 'physical', userType: role, ...data })
    }
  }

  const option = [
    { value: 'yatt', label: 'YaTT' },
    { value: 'fermer', label: 'Fermer xo‘jaligi' },
    { value: 'dehqon', label: 'Dehqon xo‘jaligi' },
    { value: 'shirkat', label: 'Shirkat xo‘jaligi' },
    { value: 'mchj', label: 'MCHJ' },
    { value: 'unitar', label: 'Unitar korxona' },
    { value: 'xususiy', label: 'Xususiy korxona' },
    { value: 'qoshma', label: 'Qo‘shma korxona' },
    { value: 'oilaviy', label: 'Oilaviy korxona' },
    { value: 'boshqa', label: 'Boshqa' }
  ]

  return (
    <div className='seller_container'>
      <div className='roleBox'>
        <label className='roleItem'>
          <input
            type='radio'
            name='sellerRole'
            value='legal'
            checked={sellerRole === 'legal'}
            onChange={e =>
              setSellerRole(e.target.value as 'legal' | 'physical')
            }
          />
          Yuridik
        </label>

        <label className='roleItem'>
          <input
            type='radio'
            name='sellerRole'
            value='physical'
            checked={sellerRole === 'physical'}
            onChange={e =>
              setSellerRole(e.target.value as 'legal' | 'physical')
            }
          />
          Jismoniy
        </label>
      </div>

      {sellerRole === 'legal' && (
        <div className='seller_form_container'>
          <form
            onSubmit={handleLegalSubmit(onLegalSubmit)}
            className='seller_form'
          >
            <div className='seller_wrapper'>
              <div className='input_group'>
                <Controller
                  name='firstName'
                  control={legalControl}
                  render={({ field }) => (
                    <MainInput
                      label='Ism'
                      {...field}
                      value={field.value || ''}
                      onChange={value => field.onChange(value)}
                    />
                  )}
                />
                {legalErrors.firstName && legalFirstName.length > 0 && (
                  <div className='error_text'>
                    {legalErrors.firstName.message}
                  </div>
                )}
              </div>

              <div className='input_group'>
                <Controller
                  name='lastName'
                  control={legalControl}
                  render={({ field }) => (
                    <MainInput
                      label='Familiya'
                      {...field}
                      value={field.value || ''}
                      onChange={value => field.onChange(value)}
                    />
                  )}
                />
                {legalErrors.lastName && legalWatch('lastName')?.length > 0 && (
                  <div className='error_text'>
                    {legalErrors.lastName.message}
                  </div>
                )}
              </div>

              <div className='input_group'>
                <Controller
                  name='activityType'
                  control={legalControl}
                  render={({ field }) => (
                    <CustomSelect
                      label='Faoliyat turi'
                      value={field.value || ''}
                      options={option}
                      onChange={value => field.onChange(value)}
                    />
                  )}
                />
                {legalErrors.activityType &&
                  legalWatch('activityType')?.length > 0 && (
                    <div className='error_text'>
                      {legalErrors.activityType.message}
                    </div>
                  )}
              </div>

              <div className='input_group'>
                <Controller
                  name='companyName'
                  control={legalControl}
                  render={({ field }) => (
                    <MainInput
                      label='Korxona nomi'
                      {...field}
                      value={field.value || ''}
                      onChange={value => field.onChange(value)}
                    />
                  )}
                />
                {legalErrors.companyName &&
                  legalWatch('companyName')?.length > 0 && (
                    <div className='error_text'>
                      {legalErrors.companyName.message}
                    </div>
                  )}
              </div>

              <div className='input_group'>
                <Controller
                  name='stir'
                  control={legalControl}
                  render={({ field }) => (
                    <MainInput
                      label='Stir (INN)'
                      {...field}
                      value={field.value || ''}
                      onChange={value => field.onChange(value)}
                    />
                  )}
                />
                {legalErrors.stir && legalWatch('stir')?.length > 0 && (
                  <div className='error_text'>{legalErrors.stir.message}</div>
                )}
              </div>

              <div className='input_group'>
                <Controller
                  name='bankDetails'
                  control={legalControl}
                  render={({ field }) => (
                    <MainInput
                      label='Bank rekvizitlari'
                      {...field}
                      value={field.value || ''}
                      onChange={value => field.onChange(value)}
                    />
                  )}
                />
                {legalErrors.bankDetails &&
                  legalWatch('bankDetails')?.length > 0 && (
                    <div className='error_text'>
                      {legalErrors.bankDetails.message}
                    </div>
                  )}
              </div>

              <div className='input_group'>
                <Controller
                  name='legalAddress'
                  control={legalControl}
                  render={({ field }) => (
                    <MainInput
                      label='Yuridik manzil'
                      {...field}
                      value={field.value || ''}
                      onChange={value => field.onChange(value)}
                    />
                  )}
                />
                {legalErrors.legalAddress &&
                  legalWatch('legalAddress')?.length > 0 && (
                    <div className='error_text'>
                      {legalErrors.legalAddress.message}
                    </div>
                  )}
              </div>

              <div className='input_group'>
                <Controller
                  name='phoneNumber'
                  control={legalControl}
                  render={({ field }) => (
                    <InputPhone
                      label='Telefon raqam'
                      {...field}
                      value={field.value || ''}
                      onChange={value => field.onChange(value)}
                    />
                  )}
                />
                {legalErrors.phoneNumber &&
                  legalWatch('phoneNumber')?.length > 0 && (
                    <div className='error_text'>
                      {legalErrors.phoneNumber.message}
                    </div>
                  )}
              </div>

              <div className='input_group'>
                <Controller
                  name='password'
                  control={legalControl}
                  render={({ field }) => (
                    <PasswordInput
                      label='Parol'
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {legalErrors.password && legalPassword.length > 0 && (
                  <div className='error_text'>
                    {legalErrors.password.message}
                  </div>
                )}
              </div>

              <div className='input_group'>
                <Controller
                  name='confirmPassword'
                  control={legalControl}
                  render={({ field }) => (
                    <MainInput
                      label='Qayta parol'
                      {...field}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {legalErrors.confirmPassword &&
                  legalConfirmPassword.length > 0 && (
                    <div className='error_text'>
                      {legalErrors.confirmPassword.message}
                    </div>
                  )}
              </div>
            </div>

            <div className='form_button_container'>
              <Button
                type='submit'
                label={
                  registerMutation.isPending
                    ? 'Kutilmoqda...'
                    : 'SMS kod yuborish'
                }
                disabled={!legalIsValid || registerMutation.isPending}
              />
            </div>
          </form>
        </div>
      )}

      {sellerRole === 'physical' && (
        <div className='seller_form_container'>
          <form
            onSubmit={handlePhysicalSubmit(onPhysicalSubmit)}
            className='seller_form'
          >
            <div className='seller_wrapper'>
              <div className='input_group'>
                <Controller
                  name='firstNamePhysical'
                  control={physicalControl}
                  render={({ field }) => (
                    <MainInput
                      label='Ism'
                      {...field}
                      value={field.value || ''}
                      onChange={value => field.onChange(value)}
                    />
                  )}
                />
                {physicalErrors.firstNamePhysical &&
                  physicalFirstName.length > 0 && (
                    <div className='error_text'>
                      {physicalErrors.firstNamePhysical.message}
                    </div>
                  )}
              </div>

              <div className='input_group'>
                <Controller
                  name='lastNamePhysical'
                  control={physicalControl}
                  render={({ field }) => (
                    <MainInput
                      label='Familiya'
                      {...field}
                      value={field.value || ''}
                      onChange={value => field.onChange(value)}
                    />
                  )}
                />
                {physicalErrors.lastNamePhysical &&
                  physicalWatch('lastNamePhysical')?.length > 0 && (
                    <div className='error_text'>
                      {physicalErrors.lastNamePhysical.message}
                    </div>
                  )}
              </div>

              <div className='input_group'>
                <Controller
                  name='phoneNumberPhysical'
                  control={physicalControl}
                  render={({ field }) => (
                    <InputPhone
                      label='Telefon raqam'
                      {...field}
                      value={field.value || ''}
                      onChange={value => field.onChange(value)}
                    />
                  )}
                />
                {physicalErrors.phoneNumberPhysical &&
                  physicalWatch('phoneNumberPhysical')?.length > 0 && (
                    <div className='error_text'>
                      {physicalErrors.phoneNumberPhysical.message}
                    </div>
                  )}
              </div>

              <div className='input_group'>
                <Controller
                  name='emailPhysical'
                  control={physicalControl}
                  render={({ field }) => (
                    <MainInput
                      label='Email'
                      type='email'
                      {...field}
                      value={field.value || ''}
                      onChange={value => field.onChange(value)}
                    />
                  )}
                />
                {physicalErrors.emailPhysical &&
                  physicalWatch('emailPhysical')?.length > 0 && (
                    <div className='error_text'>
                      {physicalErrors.emailPhysical.message}
                    </div>
                  )}
              </div>

              <div className='input_group'>
                <Controller
                  name='passwordPhysical'
                  control={physicalControl}
                  render={({ field }) => (
                    <MainInput
                      label='Parol'
                      type='password'
                      {...field}
                      value={field.value || ''}
                      onChange={value => field.onChange(value)}
                    />
                  )}
                />
                {physicalErrors.passwordPhysical &&
                  physicalPassword.length > 0 && (
                    <div className='error_text'>
                      {physicalErrors.passwordPhysical.message}
                    </div>
                  )}
              </div>

              <div className='input_group'>
                <Controller
                  name='confirmPasswordPhysical'
                  control={physicalControl}
                  render={({ field }) => (
                    <MainInput
                      label='Parolni takrorlash'
                      type='password'
                      {...field}
                      value={field.value || ''}
                      onChange={value => field.onChange(value)}
                    />
                  )}
                />
                {physicalErrors.confirmPasswordPhysical &&
                  physicalConfirmPassword.length > 0 && (
                    <div className='error_text'>
                      {physicalErrors.confirmPasswordPhysical.message}
                    </div>
                  )}
              </div>
            </div>

            <div className='form_button_container'>
              <Button
                type='submit'
                label={
                  registerMutation.isPending
                    ? 'Kutilmoqda...'
                    : 'SMS kod yuborish'
                }
                disabled={!physicalIsValid || registerMutation.isPending}
              />
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default Seller
