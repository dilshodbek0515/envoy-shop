'use client'
import './seller.css'
import MainInput from '../../../../../shared/ui/input/MainInput/input'
import { useState } from 'react'
import InputPhone from '../../../../../shared/ui/input/InputPhone/InputPhone'
import CustomSelect from '../../../../../shared/ui/select/select'
import Button from '../../../../../shared/ui/button/button'
import { RegisterFn } from '../../../../../../../../packages/api/register/register'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
const Seller = ({ role }) => {
  const [sellerRole, setSellerRole] = useState('legal')
  const router = useRouter()

  const [sellerForm, setSellerForm] = useState({
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

  const handleChange = e => {
    const { name, value } = e.target
    setSellerForm(prev => ({
      ...prev,
      [name]: value
    }))
  }
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

  const handleRegister = async e => {
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
      const registrationData = {
        role: sellerRole,
        userType: role,
        ...sellerForm
      }

      const res = await RegisterFn({ registrationData })
      console.log('Ishladi', res)
      router.push('/Register/RegisterSms')
      console.log(registrationData)
    } catch (error) {
      if (error instanceof AxiosError) {
        error.response.data || error.messageregistrationData
        console.log('Ishlamadi')
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
            onChange={e => setSellerRole(e.target.value)}
          />
          Yuridik
        </label>

        <label className='roleItem'>
          <input
            type='radio'
            name='sellerRole'
            value='physical'
            checked={sellerRole === 'physical'}
            onChange={e => setSellerRole(e.target.value)}
          />
          Jismoniy
        </label>
      </div>

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
