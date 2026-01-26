'use client'
import { useState, useMemo } from 'react'
import Input from '../../../../shared/ui/input/input'
import './Parol.css'
import Link from 'next/link'
import CheckIcon from '../../assets/icons/checkICon'

const Parol = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // useMemo yordamida validationni hisoblash
  const validations = useMemo(() => {
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumber = /[0-9]/.test(password)
    const hasMinLength = password.length >= 8
    const passwordsMatch = password === confirmPassword && password !== ''

    return {
      hasUpperCase,
      hasLowerCase,
      hasNumber,
      hasMinLength,
      passwordsMatch
    }
  }, [password, confirmPassword])

  // Barcha shartlar bajarilganligini tekshirish
  const isAllValid = useMemo(() => {
    return Object.values(validations).every(v => v === true)
  }, [validations])

  return (
    <div className='container'>
      <div className='box'>
        <div className='header'>
          <p>Parolni tiklash</p>
        </div>
        <div className='inputBox'>
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 20
            }}
          >
            <Input
              label={'Parol'}
              value={password}
              type='password'
              onChange={e => setPassword(e.target.value)}
            />
            <Input
              label={'Qayta parol'}
              value={confirmPassword}
              type='password'
              onChange={e => setConfirmPassword(e.target.value)}
            />

            <div className='check'>
              <div className='checkDiv'>
                <div
                  className={`checkBox ${
                    validations.hasUpperCase ? 'active' : ''
                  }`}
                >
                  {validations.hasUpperCase && <CheckIcon />}
                </div>
                <p className={validations.hasUpperCase ? 'active-text' : ''}>
                  1 ta katta harf
                </p>
              </div>

              <div className='checkDiv'>
                <div
                  className={`checkBox ${
                    validations.hasLowerCase ? 'active' : ''
                  }`}
                >
                  {validations.hasLowerCase && <CheckIcon />}
                </div>
                <p className={validations.hasLowerCase ? 'active-text' : ''}>
                  1 ta kichik harf
                </p>
              </div>

              <div className='checkDiv'>
                <div
                  className={`checkBox ${
                    validations.hasNumber ? 'active' : ''
                  }`}
                >
                  {validations.hasNumber && <CheckIcon />}
                </div>
                <p className={validations.hasNumber ? 'active-text' : ''}>
                  1 ta son
                </p>
              </div>

              <div className='checkDiv'>
                <div
                  className={`checkBox ${
                    validations.hasMinLength ? 'active' : ''
                  }`}
                >
                  {validations.hasMinLength && <CheckIcon />}
                </div>
                <p className={validations.hasMinLength ? 'active-text' : ''}>
                  8 ta belgi
                </p>
              </div>

              <div className='checkDiv'>
                <div
                  className={`checkBox ${
                    validations.passwordsMatch ? 'active' : ''
                  }`}
                >
                  {validations.passwordsMatch && <CheckIcon />}
                </div>
                <p className={validations.passwordsMatch ? 'active-text' : ''}>
                  Parollar mos kelishi
                </p>
              </div>
            </div>
          </div>

          <Link
            className={`buttonBox ${isAllValid ? 'active' : 'disabled'}`}
            href={isAllValid ? '/Login' : ''}
            style={{
              pointerEvents: isAllValid ? 'auto' : 'none',
              opacity: isAllValid ? 1 : 0.5
            }}
          >
            Davom etish
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Parol
