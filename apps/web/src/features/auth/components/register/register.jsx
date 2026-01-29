'use client'
import './register.css'
import { useState } from 'react'
import Button from '../../../../shared/ui/button/button'
import Link from 'next/link'
import Seller from './seller/seller'
import Buyer from './buyer/buyer'
const Register = () => {
  const [role, setRole] = useState('seller')

  return (
    <div className='container'>
      <div className='register_box'>
        <h2 className='login_title'>Ro'yxatdan o'tish</h2>

        <div className='roleBox'>
          <div
            className={`seller_style ${role === 'seller' && 'select_role'}`}
            onClick={() => setRole('seller')}
          >
            Sotuvchi
          </div>
          <div
            className={`buyer_style ${role === 'buyer' && 'select_role'}`}
            onClick={() => setRole('buyer')}
          >
            Xaridor
          </div>
        </div>

        {role === 'seller' && <Seller />}
        {role === 'buyer' && <Buyer />}

        <Button
          type='submit'
          label={'SMS kod yuborish'}
          path='/Register/RegisterSms'
        />
        <div className='route_bottom'>
          <Link href='/Login' className='route_button_style'>
            <span className='acc'>Akkountingiz bormi? </span> Kirish
          </Link>
          <span />
        </div>
      </div>
    </div>
  )
}

export default Register
