'use client'
import './seller.css'
import MainInput from '../../../../../shared/ui/input/MainInput/input'
import React, { useState } from 'react'
import InputPhone from '../../../../../shared/ui/input/InputPhone/InputPhone'
import CustomSelect from '../../../../../shared/ui/select/select'
import Button from '../../../../../shared/ui/button/button'
import { RegisterFn } from '../../../../../../../../packages/api/register/register'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'

interface SellerProps {
  role: 'seller' | 'buyer'
}

interface LegalForm {
  firstName: string
  lastName: string
  stir: string
  activityType: string
  companyName: string
  legalAddress: string
  bankDetails: string
  phoneNumber: string
  password: string
  confirmPassword: string
}

interface PhysicalForm {
  firstNamePhysical: string
  lastNamePhysical: string
  phoneNumberPhysical: string
  passwordPhysical: string
  emailPhysical: string
  confirmPasswordPhysical: string
}

const Seller: React.FC<SellerProps> = ({ role }) => {
  const [sellerRole, setSellerRole] = useState<'legal' | 'physical'>('legal')
  const router = useRouter()

  //yuridik
  const [sellerForm, setSellerForm] = useState<LegalForm>({
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
  })

  //jismoniy
  const [physicalForm, setPhysicalForm] = useState<PhysicalForm>({
    firstNamePhysical: '',
    lastNamePhysical: '',
    phoneNumberPhysical: '',
    passwordPhysical: '',
    emailPhysical: '',
    confirmPasswordPhysical: ''
  })

  //yuridik
  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target
    setSellerForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  //jismoniy
  const physicalhandleChange = (e: {
    target: { name: string; value: string }
  }) => {
    const { name, value } = e.target
    setPhysicalForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  //yuridik
  const isRoleValid = role === 'seller' || role === 'buyer'
  const isFirstName = sellerForm.firstName.trim().length >= 2
  const isLastName = sellerForm.lastName.trim().length >= 2
  const isStir = sellerForm.stir.length === 9
  const isActivityType = sellerForm.activityType.trim().length >= 2
  const isCompanyName = sellerForm.companyName.trim().length >= 3
  const isLegalAddress = sellerForm.legalAddress.trim().length >= 5
  const isBankDetails = sellerForm.bankDetails.trim().length >= 20
  const isPhoneNumber = sellerForm.phoneNumber.toString().length === 9
  const isPassword = sellerForm.password.length >= 8
  const isConfirmPassword = sellerForm.confirmPassword === sellerForm.password
  let registerFormValid = false

  //jismoniy
  const isPhysicalFirstName = physicalForm.firstNamePhysical.trim().length >= 2
  const isPhysicalLastName = physicalForm.lastNamePhysical.trim().length >= 2
  const isPhysicalPhone =
    physicalForm.phoneNumberPhysical.toString().length === 9
  const isPhysicalEmail = physicalForm.emailPhysical.includes('@')
  const isPhysicalPassword = physicalForm.passwordPhysical.length >= 8
  const isPhysicalConfirmPassword =
    physicalForm.passwordPhysical === physicalForm.confirmPasswordPhysical

  if (sellerRole === 'legal') {
    registerFormValid =
      isFirstName &&
      isLastName &&
      isStir &&
      isActivityType &&
      isCompanyName &&
      isLegalAddress &&
      isBankDetails &&
      isPhoneNumber &&
      isPassword &&
      isConfirmPassword
  }

  if (sellerRole === 'physical') {
    registerFormValid =
      isPhysicalFirstName &&
      isPhysicalLastName &&
      isPhysicalPhone &&
      isPhysicalEmail &&
      isPhysicalPassword &&
      isPhysicalConfirmPassword
  }

  const handleRegister = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (!registerFormValid) {
      console.log('Form valid emas:', {
        isRoleValid,
        isFirstName,
        isLastName,
        isStir,
        isActivityType,
        isCompanyName,
        isLegalAddress,
        isBankDetails,
        isPhoneNumber,
        isPassword,
        isConfirmPassword
      })
      return
    }

    try {
      const registrationData =
        sellerRole === 'legal'
          ? { role: sellerRole, userType: role, ...sellerForm }
          : { role: sellerRole, userType: role, ...physicalForm }

      const res = await RegisterFn({ registrationData })
      console.log('Ishladi', res)
      router.push('/Register/RegisterSms')
      console.log(registrationData)
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log('Ishlamadi', error.response?.data || error.message)
      }
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
    <>
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
        <div className='seller_wrapper'>
          <MainInput
            name='firstName'
            value={sellerForm.firstName}
            label={'Ism'}
            handleChange={handleChange}
            type='text'
          />
          <MainInput
            name='lastName'
            value={sellerForm.lastName}
            label={'Familiya'}
            handleChange={handleChange}
            type='text'
          />
          <CustomSelect
            label={'Faoliyat turi'}
            value={sellerForm.activityType}
            options={option}
            onChange={value =>
              setSellerForm(prev => ({
                ...prev,
                activityType: value
              }))
            }
          />
          <MainInput
            name='companyName'
            value={sellerForm.companyName}
            label={'Korxona nomi'}
            handleChange={handleChange}
            type='text'
          />
          <MainInput
            name='stir'
            value={sellerForm.stir}
            label={'Stir (INN)'}
            handleChange={handleChange}
            type='number'
          />
          <MainInput
            name='bankDetails'
            value={sellerForm.bankDetails}
            label={'Bank rekvizitlari'}
            handleChange={handleChange}
            type='number'
          />
          <MainInput
            name='legalAddress'
            value={sellerForm.legalAddress}
            label={'Yuridik manzil'}
            handleChange={handleChange}
            type='text'
          />
          <InputPhone
            name='phoneNumber'
            value={sellerForm.phoneNumber}
            label={'Telefon raqam'}
            handleChange={handleChange}
            type='number'
          />
          <MainInput
            name='password'
            value={sellerForm.password}
            label={'Parol'}
            handleChange={handleChange}
            type='text'
          />
          <MainInput
            name='confirmPassword'
            value={sellerForm.confirmPassword}
            label={'Qayta parol'}
            handleChange={handleChange}
            type='text'
          />
        </div>
      )}

      {sellerRole === 'physical' && (
        <div className='seller_wrapper'>
          <MainInput
            type='text'
            label={'Ism'}
            name='firstNamePhysical'
            value={physicalForm.firstNamePhysical}
            handleChange={physicalhandleChange}
          />
          <MainInput
            type='text'
            label={'Familiya'}
            name='lastNamePhysical'
            value={physicalForm.lastNamePhysical}
            handleChange={physicalhandleChange}
          />
          <InputPhone
            type='number'
            label={'Telefon raqam'}
            name='phoneNumberPhysical'
            value={physicalForm.phoneNumberPhysical}
            handleChange={physicalhandleChange}
          />
          <MainInput
            type='email'
            label={'Email'}
            name='emailPhysical'
            value={physicalForm.emailPhysical}
            handleChange={physicalhandleChange}
          />
          <MainInput
            type='text'
            label={'Parol'}
            name='passwordPhysical'
            value={physicalForm.passwordPhysical}
            handleChange={physicalhandleChange}
          />
          <MainInput
            type='text'
            label={'Parolni takrorlash'}
            name='confirmPasswordPhysical'
            value={physicalForm.confirmPasswordPhysical}
            handleChange={physicalhandleChange}
          />
        </div>
      )}

      <Button
        type='submit'
        label={'SMS kod yuborish'}
        handleSubmit={handleRegister}
        disabled={!registerFormValid}
      />
    </>
  )
}

export default Seller
