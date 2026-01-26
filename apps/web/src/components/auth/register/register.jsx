'use client'
import './register.css'
import { useState } from 'react'
import Link from 'next/link'
import Yuridik from '../role-second/yuridik/yuridik'
import Jismoniy from '../role-second/jismoniy/jismoniy'
const Register = () => {
  const [active, setActive] = useState('register')
  const [secondRole, setSecondRole] = useState('yuridik')
  const [errors, setErrors] = useState({})

  const [form, setForm] = useState({
    ism: '',
    familiya: '',
    faoliyat: '',
    korxona: '',
    stir: '',
    yuridik: '',
    bank: '',
    telefon: '',
    parol: '',
    qaytaParol: ''
  })

  const options = [
    'YaTT',
    'M.CH.J',
    "Fermer Xo'jaligi",
    "Dehqon Xo'jaligi",
    "Shirkat Xo'jaligi",
    'Unitar Korxona',
    'Xususiy Korxona',
    "Qo'shma Korxona",
    'Oilaviy Korxona',
    'Boshqa'
  ]

  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: value
    }))

    if (errors[name]) {
      setErrors(prev => {
        const copy = { ...prev }
        delete copy[name]
        return copy
      })
    }
  }

  const handleSelectFaoliyat = value => {
    setForm(prev => ({
      ...prev,
      faoliyat: value
    }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log({ secondRole, ...form ``})
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

        <div className='center'>
          <div className='center_box'>
            <div className='role_select'>
              <button
                onClick={() => setSecondRole('yuridik')}
                className={`yuridik ${
                  secondRole === 'yuridik' ? 'primary' : ''
                }`}
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
              <Yuridik
                form={form}
                handleChange={handleChange}
                options={options}
                handleSelectFaoliyat={handleSelectFaoliyat}
                errors={errors}
              />
            )}

            {secondRole === 'jismoniy' && <Jismoniy />}
          </div>

          <button
            type='submit'
            onClick={handleSubmit}
            className={`bottom_btn ${secondRole === 'yuridik' ? 'back' : ''}`}
          >
            Ro'yxatdan o'tish
          </button>
        </div>
      </div>
    </div>
  )
}

export default Register
