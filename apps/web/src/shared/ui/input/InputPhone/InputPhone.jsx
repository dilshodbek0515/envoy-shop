'use client'
import { useState } from 'react'
import './InputPhone.css'
import '../inputGlobal.css'
import CloseIcon from '../../../../features/auth/assets/icons/close'

const InputPhone = ({ label, handleChange, value = '', ...props }) => {
  const [focused, setFocused] = useState(false)
  const [numbers, setNumbers] = useState('')

  const isActive = focused || numbers.length > 0

  const formatNumber = value => {
    if (!value || value.length === 0) return ''

    let v = value
    if (v.length > 2) v = v.slice(0, 2) + ' ' + v.slice(2)
    if (v.length > 6) v = v.slice(0, 6) + ' ' + v.slice(6)
    if (v.length > 9) v = v.slice(0, 9) + ' ' + v.slice(9)
    return v
  }

  const handleChanges = e => {
    const onlyNumbers = e.target.value.replace(/\D/g, '').slice(0, 9)
    setNumbers(onlyNumbers)
    handleChange?.({
      target: onlyNumbers ? `998${onlyNumbers}` : '',
      name: props.name || 'phone'
    })
  }

  const handleClear = () => {
    setNumbers('')
    handleChange?.({
      target: {
        value: '',
        name: props.name || 'phone'
      }
    })
  }
  return (
    <div className={`wrapper ${isActive ? 'active' : ''}`}>
      <label className={`label ${isActive ? 'active' : ''}`}>{label}</label>
      <div className='inputContainer'>
        <span className={`prefix ${isActive ? 'show' : ''}`}>+998</span>
        <input
          {...props}
          className={`inputt ${isActive ? 'active' : ''}`}
          type='tel'
          value={formatNumber(numbers)}
          onChange={handleChanges}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          inputMode='numeric'
          autoComplete='off'
          autoCorrect='off'
          spellCheck='false'
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
