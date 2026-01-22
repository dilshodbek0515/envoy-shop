'use client'

import { useState } from 'react'
import './register.css'
import Link from 'next/link'
const Register = () => {
  const [active, setActive] = useState('register')

  return (
    <div className='container'>
      <div className='register_box'>
        <div className='top_box'>
          <Link
            href={'/Register'}
            className={`login_selected ${active === 'login' ? 'active' : ''}`}
            onClick={() => setActive('login')}
          >
            Kirish
          </Link>
          <Link
            href={'/Register'}
            className={`register_selected ${
              active === 'register' ? 'active' : ''
            }`}
            onClick={() => setActive('register')}
          >
            Ro'yxatdan o'tish
          </Link>
          <span
            className={`underline ${active === 'register' ? 'right' : 'left'}`}
          />
        </div>

        <div className='center_box'>
          <div className='role_select'>
            <button className='yuridik'>Yuridik</button>
            <button className='jismoniy'>Jismoniy</button>
          </div>
          <div className='forma'>
            <input className='inputs' type='text' placeholder='Ism' required />
            <input
              className='inputs'
              type='text'
              placeholder='Familiya'
              required
            />
            <input
              className='inputs'
              type='number'
              placeholder='Telefon raqam'
              required
            />
            <input
              className='inputs'
              type='email'
              placeholder='Elektron pochta'
              required
            />
            <input
              className='inputs'
              type='password'
              placeholder='Parol'
              required
            />
          </div>
        </div>

        <button className='bottom_btn'>Ro'yxatdan o'tish</button>
      </div>
    </div>
  )
}

export default Register
