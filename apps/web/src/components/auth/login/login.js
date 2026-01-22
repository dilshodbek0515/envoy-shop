'use client'

import Link from 'next/link'
import './login.css'
import { useState } from 'react'

const Login = () => {
  const [active, setActive] = useState('login')

  return (
    <div className='container'>
      <div className='login_box'>
        <div className='top_box'>
          <Link
            href={'/Login'}
            className={`login_selected ${active === 'login' ? 'active' : ''}`}
            onClick={() => setActive('login')}
          >
            Kirish
          </Link>
          <Link
            href={'/Role'}
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

        <div className='bottom_box'>
          <div className='forma'>
            <input
              className='inputs'
              type='number'
              placeholder='Telefon raqam'
              required
            />

            <input
              className='inputs'
              type='password'
              placeholder='Parol'
              required
            />
          </div>
          <button className='login_btn'>Dasturga kirish</button>
        </div>
      </div>
    </div>
  )
}

export default Login
