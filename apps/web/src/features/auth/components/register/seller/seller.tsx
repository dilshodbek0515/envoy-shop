'use client'
import './seller.css'
import MainInput from '../../../../../shared/ui/input/MainInput/input'
import { FC, useState } from 'react'
import InputPhone from '../../../../../shared/ui/input/InputPhone/InputPhone'
import CustomSelect from '../../../../../shared/ui/select/select'
import Button from '../../../../../shared/ui/button/button'
import PasswordInput from 'apps/web/src/shared/ui/input/PasswordInput/PasswordInput'

interface SellerProps {
  role: 'seller' | 'buyer'
}

const Seller: FC<SellerProps> = () => {
  const [sellerRole, setSellerRole] = useState<'legal' | 'physical'>('legal')

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

  const handleChange = () => {}

  return (
    <div className='seller_container'>
      <div className='roleBox'>
        <label className='roleItem'>
          <input
            type='radio'
            name='sellerRole'
            value='legal'
            checked={sellerRole === 'legal'}
            onChange={() => setSellerRole('legal')}
          />
          Yuridik
        </label>

        <label className='roleItem'>
          <input
            type='radio'
            name='sellerRole'
            value='physical'
            checked={sellerRole === 'physical'}
            onChange={() => setSellerRole('physical')}
          />
          Jismoniy
        </label>
      </div>

      {/* ================= LEGAL ================= */}

      {sellerRole === 'legal' && (
        <div className='seller_form_container'>
          <form className='seller_form'>
            <div className='seller_wrapper'>
              <div className='input_group'>
                <MainInput label='Ism' value='' />
              </div>

              <div className='input_group'>
                <MainInput label='Familiya' value='' />
              </div>

              <div className='input_group'>
                <CustomSelect
                  label='Faoliyat turi'
                  options={option}
                  value=''
                  onChange={handleChange}
                />
              </div>

              <div className='input_group'>
                <MainInput label='Korxona nomi' value='' />
              </div>

              <div className='input_group'>
                <MainInput label='STIR (INN)' value='' />
              </div>

              <div className='input_group'>
                <MainInput label='Bank rekvizitlari' value='' />
              </div>

              <div className='input_group'>
                <MainInput label='Yuridik manzil' value='' />
              </div>

              <div className='input_group'>
                <InputPhone label='Telefon raqam' value='' />
              </div>

              <div className='input_group'>
                <PasswordInput label='Parol' value='' />
              </div>

              <div className='input_group'>
                <PasswordInput label='Qayta parol' value='' />
              </div>
            </div>

            <div className='form_button_container'>
              <Button type='submit' label='SMS kod yuborish' />
            </div>
          </form>
        </div>
      )}

      {/* ================= PHYSICAL ================= */}

      {sellerRole === 'physical' && (
        <div className='seller_form_container'>
          <form className='seller_form'>
            <div className='seller_wrapper'>
              <div className='input_group'>
                <MainInput label='Ism' value='' />
              </div>

              <div className='input_group'>
                <MainInput label='Familiya' value='' />
              </div>

              <div className='input_group'>
                <InputPhone label='Telefon raqam' value='' />
              </div>

              <div className='input_group'>
                <MainInput label='Email' value='' />
              </div>

              <div className='input_group'>
                <PasswordInput label='Parol' value='' />
              </div>

              <div className='input_group'>
                <PasswordInput label='Qayta parol' value='' />
              </div>
            </div>

            <div className='form_button_container'>
              <Button type='submit' label='SMS kod yuborish' />
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default Seller
