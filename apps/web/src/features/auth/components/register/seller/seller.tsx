'use client'
import './seller.css'
import MainInput from '../../../../../shared/ui/input/MainInput/input'
import { FC, useState } from 'react'
import InputPhone from '../../../../../shared/ui/input/InputPhone/InputPhone'
import CustomSelect from '../../../../../shared/ui/select/select'
import Button from '../../../../../shared/ui/button/button'
import PasswordInput from 'apps/web/src/shared/ui/input/PasswordInput/PasswordInput'
import { useRouter } from 'next/navigation'
import { useForm, Controller, Resolver } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { RegisterFn } from '../../../../../../../../packages/api/register/register'
import {
  legalSchema,
  physicalSchema,
  LegalFormData,
  PhysicalFormData
} from '../../../../../../../schema/schema'

interface SellerProps {
  role: 'seller' | 'buyer'
}

// ✅ Login faylidagi kabi Safe Zod Resolver
const createSafeZodResolver = <T extends object>(schema: any): Resolver<T> => {
  return async values => {
    const result = schema.safeParse(values)

    if (result.success) {
      return { values: result.data, errors: {} }
    }

    const errors = result.error.flatten().fieldErrors
    return {
      values: {},
      errors: Object.fromEntries(
        Object.entries(errors).map(([key, val]) => [
          key,
          { type: 'validation', message: val?.[0] }
        ])
      )
    }
  }
}

// ✅ Yuridik shaxs uchun resolver
const legalSafeZodResolver: Resolver<LegalFormData> = async values => {
  const result = legalSchema.safeParse(values)
  if (result.success) {
    return { values: result.data, errors: {} }
  }
  const errors = result.error.flatten().fieldErrors
  return {
    values: {},
    errors: Object.fromEntries(
      Object.entries(errors).map(([key, val]) => [
        key,
        { type: 'validation', message: val?.[0] }
      ])
    )
  }
}

// ✅ Jismoniy shaxs uchun resolver
const physicalSafeZodResolver: Resolver<PhysicalFormData> = async values => {
  const result = physicalSchema.safeParse(values)
  if (result.success) {
    return { values: result.data, errors: {} }
  }
  const errors = result.error.flatten().fieldErrors
  return {
    values: {},
    errors: Object.fromEntries(
      Object.entries(errors).map(([key, val]) => [
        key,
        { type: 'validation', message: val?.[0] }
      ])
    )
  }
}

const Seller: FC<SellerProps> = ({ role }) => {
  const [sellerRole, setSellerRole] = useState<'legal' | 'physical'>('legal')
  const router = useRouter()
  const isLegal = sellerRole === 'legal'

  // Yuridik form
  const {
    control: legalControl,
    handleSubmit: handleLegalSubmit,
    watch: watchLegal,
    formState: { errors: legalErrors, isValid: legalIsValid }
  } = useForm<LegalFormData>({
    resolver: isLegal ? legalSafeZodResolver : undefined,
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
    watch: watchPhysical,
    formState: { errors: physicalErrors, isValid: physicalIsValid }
  } = useForm<PhysicalFormData>({
    resolver: !isLegal ? physicalSafeZodResolver : undefined,
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
    onSuccess: () => router.push('/Register/RegisterSms'),
    onError: (error: any) => console.log('Ishlamadi', error)
  })

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

  // Watch values for real-time validation
  const legalPhoneValue = watchLegal('phoneNumber') || ''
  const legalPasswordValue = watchLegal('password') || ''
  const legalConfirmPasswordValue = watchLegal('confirmPassword') || ''

  const physicalPhoneValue = watchPhysical('phoneNumberPhysical') || ''
  const physicalPasswordValue = watchPhysical('passwordPhysical') || ''
  const physicalConfirmPasswordValue =
    watchPhysical('confirmPasswordPhysical') || ''

  // Form validation states
  const isLegalPhoneValid = legalPhoneValue.length === 9
  const isLegalPasswordValid = legalPasswordValue.length >= 8
  const isLegalPasswordsMatch = legalPasswordValue === legalConfirmPasswordValue
  const isLegalFormValid =
    legalIsValid &&
    isLegalPhoneValid &&
    isLegalPasswordValid &&
    isLegalPasswordsMatch

  const isPhysicalPhoneValid = physicalPhoneValue.length === 9
  const isPhysicalPasswordValid = physicalPasswordValue.length >= 8
  const isPhysicalPasswordsMatch =
    physicalPasswordValue === physicalConfirmPasswordValue
  const isPhysicalFormValid =
    physicalIsValid &&
    isPhysicalPhoneValid &&
    isPhysicalPasswordValid &&
    isPhysicalPasswordsMatch

  const onLegalSubmit = (data: LegalFormData) => {
    if (isLegalFormValid) {
      registerMutation.mutate({
        role: 'legal',
        userType: role,
        ...data,
        phoneNumber: `+998${data.phoneNumber}`
      })
    }
  }

  const onPhysicalSubmit = (data: PhysicalFormData) => {
    if (isPhysicalFormValid) {
      registerMutation.mutate({
        role: 'physical',
        userType: role,
        ...data,
        phoneNumberPhysical: `+998${data.phoneNumberPhysical}`
      })
    }
  }

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

      {/* Legal Form */}
      {sellerRole === 'legal' && (
        <div className='seller_form_container'>
          <form
            onSubmit={handleLegalSubmit(onLegalSubmit)}
            className='seller_form'
          >
            <div className='seller_wrapper'>
              {[
                'firstName',
                'lastName',
                'activityType',
                'companyName',
                'stir',
                'bankDetails',
                'legalAddress',
                'phoneNumber',
                'password',
                'confirmPassword'
              ].map(fieldName => (
                <div className='input_group' key={fieldName}>
                  <Controller
                    name={fieldName as any}
                    control={legalControl}
                    render={({ field }) =>
                      fieldName === 'activityType' ? (
                        <CustomSelect
                          label='Faoliyat turi'
                          value={field.value || ''}
                          options={option}
                          onChange={v => field.onChange(v)}
                        />
                      ) : fieldName === 'password' ||
                        fieldName === 'confirmPassword' ? (
                        <PasswordInput
                          label={
                            fieldName === 'password' ? 'Parol' : 'Qayta parol'
                          }
                          value={field.value || ''}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                        />
                      ) : fieldName === 'phoneNumber' ? (
                        <InputPhone
                          label='Telefon raqam'
                          value={field.value || ''}
                          onChange={value => {
                            const numbers = value.replace(/\D/g, '').slice(0, 9)
                            field.onChange(numbers)
                          }}
                          onBlur={field.onBlur}
                        />
                      ) : (
                        <MainInput
                          label={
                            fieldName === 'firstName'
                              ? 'Ism'
                              : fieldName === 'lastName'
                              ? 'Familiya'
                              : fieldName === 'companyName'
                              ? 'Korxona nomi'
                              : fieldName === 'stir'
                              ? 'STIR (INN)'
                              : fieldName === 'bankDetails'
                              ? 'Bank rekvizitlari'
                              : fieldName === 'legalAddress'
                              ? 'Yuridik manzil'
                              : ''
                          }
                          value={field.value || ''}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                        />
                      )
                    }
                  />
                  {legalErrors[fieldName as keyof LegalFormData] && (
                    <div className='error_text'>
                      {legalErrors[fieldName as keyof LegalFormData]?.message}
                    </div>
                  )}

                  {/* Additional validation messages */}
                  {fieldName === 'phoneNumber' &&
                    legalPhoneValue.length > 0 &&
                    legalPhoneValue.length < 9 && (
                      <div className='error_text'>
                        Telefon raqam 9 ta raqam bo'lishi kerak
                      </div>
                    )}
                  {fieldName === 'password' &&
                    legalPasswordValue.length > 0 &&
                    legalPasswordValue.length < 8 && (
                      <div className='error_text'>
                        Parol kamida 8 ta belgidan iborat bo'lishi kerak
                      </div>
                    )}
                  {fieldName === 'confirmPassword' &&
                    legalConfirmPasswordValue.length >= 8 &&
                    legalPasswordValue.length >= 8 &&
                    legalPasswordValue !== legalConfirmPasswordValue && (
                      <div className='error_text'>
                        Parollar bir-biriga mos kelmadi
                      </div>
                    )}
                </div>
              ))}
            </div>

            <div className='form_button_container'>
              <Button
                type='submit'
                label={
                  registerMutation.isPending
                    ? 'Kutilmoqda...'
                    : 'SMS kod yuborish'
                }
                disabled={!isLegalFormValid || registerMutation.isPending}
              />
            </div>
          </form>
        </div>
      )}

      {/* Physical Form */}
      {sellerRole === 'physical' && (
        <div className='seller_form_container'>
          <form
            onSubmit={handlePhysicalSubmit(onPhysicalSubmit)}
            className='seller_form'
          >
            <div className='seller_wrapper'>
              {[
                'firstNamePhysical',
                'lastNamePhysical',
                'phoneNumberPhysical',
                'emailPhysical',
                'passwordPhysical',
                'confirmPasswordPhysical'
              ].map(fieldName => (
                <div className='input_group' key={fieldName}>
                  <Controller
                    name={fieldName as any}
                    control={physicalControl}
                    render={({ field }) =>
                      fieldName === 'passwordPhysical' ||
                      fieldName === 'confirmPasswordPhysical' ? (
                        <PasswordInput
                          label={
                            fieldName === 'passwordPhysical'
                              ? 'Parol'
                              : 'Qayta parol'
                          }
                          value={field.value || ''}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                        />
                      ) : fieldName === 'phoneNumberPhysical' ? (
                        <InputPhone
                          label='Telefon raqam'
                          value={field.value || ''}
                          onChange={value => {
                            const numbers = value.replace(/\D/g, '').slice(0, 9)
                            field.onChange(numbers)
                          }}
                          onBlur={field.onBlur}
                        />
                      ) : (
                        <MainInput
                          label={
                            fieldName === 'firstNamePhysical'
                              ? 'Ism'
                              : fieldName === 'lastNamePhysical'
                              ? 'Familiya'
                              : fieldName === 'emailPhysical'
                              ? 'Email'
                              : ''
                          }
                          value={field.value || ''}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                        />
                      )
                    }
                  />
                  {physicalErrors[fieldName as keyof PhysicalFormData] && (
                    <div className='error_text'>
                      {
                        physicalErrors[fieldName as keyof PhysicalFormData]
                          ?.message
                      }
                    </div>
                  )}

                  {/* Additional validation messages */}
                  {fieldName === 'phoneNumberPhysical' &&
                    physicalPhoneValue.length > 0 &&
                    physicalPhoneValue.length < 9 && (
                      <div className='error_text'>
                        Telefon raqam 9 ta raqam bo'lishi kerak
                      </div>
                    )}
                  {fieldName === 'passwordPhysical' &&
                    physicalPasswordValue.length > 0 &&
                    physicalPasswordValue.length < 8 && (
                      <div className='error_text'>
                        Parol kamida 8 ta belgidan iborat bo'lishi kerak
                      </div>
                    )}
                  {fieldName === 'confirmPasswordPhysical' &&
                    physicalConfirmPasswordValue.length >= 8 &&
                    physicalPasswordValue.length >= 8 &&
                    physicalPasswordValue !== physicalConfirmPasswordValue && (
                      <div className='error_text'>
                        Parollar bir-biriga mos kelmadi
                      </div>
                    )}
                </div>
              ))}
            </div>

            <div className='form_button_container'>
              <Button
                type='submit'
                label={
                  registerMutation.isPending
                    ? 'Kutilmoqda...'
                    : 'SMS kod yuborish'
                }
                disabled={!isPhysicalFormValid || registerMutation.isPending}
              />
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default Seller
