'use client'
import './register.css'
import { useState } from 'react'
import Link from 'next/link'
import Button from '../../button/button'
import Input from '../../input/input'
const Register = () => {
  const [active, setActive] = useState('register')
  const [secondRole, setSecondRole] = useState('jismoniy')
  const [faoliyat, setFaoliyat] = useState('')
  const [korxona, setKorxona] = useState('')
  const [stir, setStir] = useState('')
  const [yuridik, setYuridik] = useState('')
  const [bank, setBank] = useState('')
  const [telefon, setTelefon] = useState('')
  const [parol, setParol] = useState('')
  const [qaytaParol, setQaytaParol] = useState('')

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
              <Input
                label={'Faoliyat turi'}
                value={faoliyat}
                type='text'
                onChange={e => setFaoliyat(e.target.value)}
              />
              <Input
                label={'Korxona nomi'}
                value={korxona}
                type='text'
                onChange={e => setKorxona(e.target.value)}
              />
              <Input
                label={'Stir (INN)'}
                value={stir}
                type='text'
                onChange={e => setStir(e.target.value)}
              />
              <Input
                label={'Yuridik manzil'}
                value={yuridik}
                type='text'
                onChange={e => setYuridik(e.target.value)}
              />
              <Input
                label={'Bank rekvizitlari'}
                value={bank}
                type='text'
                onChange={e => setBank(e.target.value)}
              />
              <Input
                label={'Telefon raqam'}
                value={telefon}
                type='text'
                onChange={e => setTelefon(e.target.value)}
              />
              <Input
                label={'Parol'}
                value={parol}
                type='text'
                onChange={e => setParol(e.target.value)}
              />
              <Input
                label={'Parolni qayta kiriting'}
                value={qaytaParol}
                type='text'
                onChange={e => setQaytaParol(e.target.value)}
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

        <Button label={`Ro'yxatdan o'tish`} />
      </div>
    </div>
  )
}

export default Register
