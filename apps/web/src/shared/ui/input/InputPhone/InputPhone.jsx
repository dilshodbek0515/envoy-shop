'use client'
import { useState } from 'react'
import './InputPhone.css'
import '../inputGlobal.css'
import CloseIcon from '../../../../features/auth/assets/icons/close'

const InputPhone = ({ label, onChange }) => {
  const [focused, setFocused] = useState(false)
  const [numbers, setNumbers] = useState('')

  const isActive = focused || numbers.length > 0

  const formatNumber = value => {
    let v = value
    if (v.length > 2) v = v.slice(0, 2) + ' ' + v.slice(2)
    if (v.length > 6) v = v.slice(0, 6) + ' ' + v.slice(6)
    if (v.length > 9) v = v.slice(0, 9) + ' ' + v.slice(9)
    return v
  }

  const handleChange = e => {
    const onlyNumbers = e.target.value.replace(/\D/g, '').slice(0, 9)
    setNumbers(onlyNumbers)

    onChange?.({
      target: { value: `998${onlyNumbers}` }
    })
  }

  const handleClear = () => {
    setNumbers('')

    onChange?.({
      target: { value: '' }
    })
  }
  return (
    <div className={`wrapper ${isActive ? 'active' : ''}`}>
      <label className={`label ${isActive ? 'active' : ''}`}>{label}</label>
      <div className='inputContainer'>
        <span className={`prefix ${isActive ? 'show' : ''}`}>+998</span>
        <input
          className={`inputt ${isActive ? 'active' : ''}`}
          type='tel'
          value={formatNumber(numbers)}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          inputMode='numeric'
        />
        <button
          type='button'
          className={`closeButton ${isActive ? 'show' : ''}`}
          onClick={handleClear}
          onMouseDown={e => e.preventDefault()}
        >
          <CloseIcon className='close' />
        </button>
      </div>
    </div>
  )
}

export default InputPhone
