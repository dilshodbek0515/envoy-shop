'use client'
import { useState } from 'react'
import './input.css'
import '../inputGlobal.css'
import CloseIcon from 'apps/web/src/features/auth/assets/icons/close'

const MainInput = ({ label, value, handleChange, type = '', ...props }) => {
  const [focused, setFocused] = useState(false)
  const isActive = focused || value.length > 0
  const clear = value.length > 0

  const handleClear = () => {
    const fakeEvent = {
      target: {
        name: props.name,
        value: ''
      }
    }
    handleChange(fakeEvent)
  }

  return (
    <div className={`wrapperI ${isActive && 'active'}`}>
      <label className={`label ${isActive && 'active'}`}>{label}</label>
      <input
        type={type}
        {...props}
        value={value}
        onChange={handleChange}
        className='main_input'
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <button
        type='button'
        className={`clear_btn ${clear ? 'show' : ''}`}
        onClick={handleClear}
        onMouseDown={e => e.preventDefault()}
      >
        <CloseIcon />
      </button>
    </div>
  )
}

export default MainInput
