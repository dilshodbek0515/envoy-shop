'use client'
import Link from 'next/link'
import { useState } from 'react'
import './role.css'

const Role = () => {
  const [active, setActive] = useState('register')
  const [role, setRole] = useState('oluvchi')
  return (
    <div className='container'>
      <div className='role_box'>
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
          <div className='role_select'>
            <button
              onClick={() => setRole('sotuvchi')}
              className={`sotuvchi ${role === 'sotuvchi' ? 'primary' : ''}`}
            >
              Sotuvchi
            </button>
            <button
              onClick={() => setRole('oluvchi')}
              className={`oluvchi ${role === 'oluvchi' ? 'primary' : ''}`}
            >
              Oluvchi
            </button>
          </div>
          <Link href={'/Register'} className='role_btn'>
            Dasturga kirish
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Role
