'use client'
import { useState } from 'react'
import './input.css'
import '../inputGlobal.css'
import CloseIcon from 'apps/web/src/features/auth/assets/icons/close'

const MainInput = ({ label, value = '', onChange, ...props }) => {
  const [focused, setFocused] = useState(false)
  const isActive = focused || value.length > 0
  const clear = value.length > 0

  const handleClear = () => {
    onChange({
      target: {
        name: props.name,
        value: ''
      }
    })
  }

  return (
    <div className={`wrapperI ${isActive && 'active'}`}>
      <label className={`label ${isActive && 'active'}`}>{label}</label>
      <input
        {...props}
        value={value}
        onChange={onChange}
        className='main_input'
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <button
        type='button'
        className={`clear_btn ${clear ? 'show' : ''}`}
        onClick={handleClear}
      >
        <CloseIcon />
      </button>
    </div>
  )
}

export default MainInput
