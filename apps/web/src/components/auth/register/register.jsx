'use client'
import './register.css'
import { useState } from 'react'
import Link from 'next/link'
import Input from '../../input/input'

const Register = () => {
  const [active, setActive] = useState('register')
  const [secondRole, setSecondRole] = useState('yuridik')

  const [faoliyat, setFaoliyat] = useState('e')
  const [korxona, setKorxona] = useState('e')
  const [stir, setStir] = useState('e')
  const [yuridik, setYuridik] = useState('e')
  const [bank, setBank] = useState('e')
  const [telefon, setTelefon] = useState('e')
  const [parol, setParol] = useState('e')
  const [qaytaParol, setQaytaParol] = useState('e')

  const isYuridikValid =
    secondRole === 'yuridik' &&
    faoliyat.length > 0 &&
    korxona.length > 0 &&
    stir.length > 0 &&
    yuridik.length > 0 &&
    bank.length > 0 &&
    telefon.length > 0 &&
    parol.length > 0 &&
    qaytaParol.length > 0

  const handleSubmit = () => {
    const fullValue = {
      secondRole,
      faoliyat,
      korxona,
      stir,
      yuridik,
      bank,
      telefon,
      parol,
      qaytaParol
    }
    console.log(fullValue)
  }

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
            <form
              onSubmit={e => {
                e.preventDefault()
                handleSubmit()
              }}
              className='yuridik_grid'
            >
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
            </form>
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

        <button
          type='submit'
          onClick={handleSubmit}
          disabled={secondRole === 'yuridik' && !isYuridikValid}
          className={`bottom_btn ${
            secondRole === 'yuridik' && isYuridikValid ? 'back' : ''
          }`}
        >
          Ro'yxatdan o'tish
        </button>
      </div>
    </div>
  )
}

export default Register
