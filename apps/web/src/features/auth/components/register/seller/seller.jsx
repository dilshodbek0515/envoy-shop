'use client'
import './seller.css'
import MainInput from '../../../../../shared/ui/input/MainInput/input'
import { useState } from 'react'
import InputPhone from '../../../../../shared/ui/input/InputPhone/InputPhone'
const Seller = () => {
  const [role, setRole] = useState('xaridor')
  const [sellerForm, setSellerForm] = useState({
    sellerRole: '',
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

  return (
    <>
      <div className='roleBox'>
        <label className='roleItem'>
          <input
            type='radio'
            name='role'
            value='xaridor'
            checked={role === 'xaridor'}
            onChange={e => setRole(e.target.value)}
          />
          Yuridik
        </label>

        <label className='roleItem'>
          <input
            type='radio'
            name='role'
            value='sotuvchi'
            checked={role === 'sotuvchi'}
            onChange={e => setRole(e.target.value)}
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
        />
        <MainInput
          name='lastName'
          value={sellerForm.lastName}
          label={'Familiya'}
          handleChange={handleChange}
        />
        <MainInput
          name='activityType'
          value={sellerForm.activityType}
          label={'Faoliyat turi'}
          handleChange={handleChange}
        />
        <MainInput
          name='companyName'
          value={sellerForm.companyName}
          label={'Korxona nomi'}
          handleChange={handleChange}
        />
        <MainInput
          name='stir'
          value={sellerForm.stir}
          label={'Stir (INN)'}
          handleChange={handleChange}
        />
        <MainInput
          name='bankDetails'
          value={sellerForm.bankDetails}
          label={'Bank rekvizitlari'}
          handleChange={handleChange}
        />
        <MainInput
          name='legalAddress'
          value={sellerForm.legalAddress}
          label={'Yuridik manzil'}
          handleChange={handleChange}
        />
        <InputPhone
          name='phoneNumber'
          value={sellerForm.phoneNumber}
          label={'Telefon raqam'}
          handleChange={handleChange}
        />
        <MainInput
          name='password'
          value={sellerForm.password}
          label={'Parol'}
          handleChange={handleChange}
        />
        <MainInput
          name='confirmPassword'
          value={sellerForm.confirmPassword}
          label={'Qayta parol'}
          handleChange={handleChange}
        />
      </div>
    </>
  )
}

export default Seller
