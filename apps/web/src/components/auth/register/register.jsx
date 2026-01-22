'use client'
import './register.css'
import { useState } from 'react'
import Link from 'next/link'
import AppButton from '../../appButton/appButton'
const Register = () => {
  const [active, setActive] = useState('register')
  const [secondRole, setSecondRole] = useState('jismoniy')

  return (
    <div className='container'>
      <div className='register_box'>
        <div className='top_box'>
          <Link
            href={'/Login'}
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
            <button
              onClick={() => setSecondRole('yuridik')}
              className={`yuridik ${secondRole === 'yuridik' ? 'primary' : ''}`}
            >
              Yuridik
            </button>
            <button
              onClick={() => setSecondRole('jismoniy')}
              className={`jismoniy ${
                secondRole === 'jismoniy' ? 'primary' : ''
              }`}
            >
              Jismoniy
            </button>
          </div>

          {secondRole === 'yuridik' && (
            <div className='yuridik_grid'>
              <input
                className='yuridik_inputs'
                type='text'
                placeholder='Faoliyat turi'
                required
              />
              <input
                className='yuridik_inputs'
                type='text'
                placeholder='Korxona nomi'
                required
              />
              <input
                className='yuridik_inputs'
                type='text'
                placeholder='Stir (INN)'
                required
              />
              <input
                className='yuridik_inputs'
                type='text'
                placeholder='Yuridik manzil'
                required
              />
              <input
                className='yuridik_inputs'
                type='text'
                placeholder='Bank rekvizitlari'
                required
              />
              <input
                className='yuridik_inputs'
                type='number'
                placeholder='Telefon raqam'
                required
              />
              <input
                className='yuridik_inputs'
                type='text'
                placeholder='Parol'
                required
              />
              <input
                className='yuridik_inputs'
                type='text'
                placeholder='Parolni qayta kiriting'
                required
              />
            </div>
          )}

          {secondRole === 'jismoniy' && (
            <div className='forma'>
              <input
                className='inputs'
                type='text'
                placeholder='Ism'
                required
              />
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
          )}
        </div>

        <AppButton label={`Ro'yxatdan o'tish`} />
      </div>
    </div>
  )
}

export default Register
