'use client'
import './register.css'
import { FC, useState } from 'react'
import Link from 'next/link'
import Buyer from './buyer/buyer'
import Seller from './seller/seller'
type Role = 'seller' | 'buyer'

const Register: FC = () => {
  const [role, setRole] = useState<Role>('seller')

  return (
    <div className='container'>
      <div className='register_box'>
        <h2 style={{ padding: 10 }} className='login_title'>
          Ro'yxatdan o'tish
        </h2>

        <div className='roleBox'>
          <div
            className={`seller_style ${role === 'seller' ? 'select_role' : ''}`}
            onClick={() => setRole('seller')}
          >
            Sotuvchi
          </div>
          <div
            className={`buyer_style ${role === 'buyer' ? 'select_role' : ''}`}
            onClick={() => setRole('buyer')}
          >
            Xaridor
          </div>
        </div>

        {role === 'seller' && <Seller role={role} />}
        {role === 'buyer' && <Buyer />}

        <div className='route_bottom'>
          <Link href='/login' className='route_button_style'>
            <span className='acc'>Akkountingiz bormi? </span> Kirish
          </Link>
          <p />
        </div>
      </div>
    </div>
  )
}

export default Register
