'use client'
import './register.css'
import { useState } from 'react'
import Button from '../../../../shared/ui/button/button'
import Link from 'next/link'
import CustomSelect from '../../../../shared/ui/select/select'
const Register = () => {
  const [registerForm, setRegisterForm] = useState({
    role: ''
  })

  const roleOptions = [
    { value: 'seller', label: 'Sotuvchi' },
    { value: 'buyer', label: 'Xaridor' }
  ]

  const handleSelectChange = value => {
    setRegisterForm(prev => ({
      ...prev,
      role: value
    }))
    console.log('Role:', value)
  }

  return (
    <div className='container'>
      <div className='login_box'>
        <h2 className='login_title'>Ro'yxatdan o'tish</h2>

        <CustomSelect
          label={'Rolni tanlang'}
          options={roleOptions}
          value={registerForm.role}
          onChange={handleSelectChange}
        />

        {registerForm.role === 'seller' && <p>Sotuvchi malumotlari</p>}
        {registerForm.role === 'buyer' && <p>Xaridor malumotlari</p>}

        <Button type='submit' label={'Kirish'} path='/' />
        <div className='route_bottom'>
          <Link href='/Login' className='route_button_style'>
            Akkountingiz bormi? Kirish
          </Link>
          <span />
        </div>
      </div>
    </div>
  )
}

export default Register
