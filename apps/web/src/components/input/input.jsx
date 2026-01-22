'use client'
import { useState } from 'react'
import './input.css'

const Input = ({ label, value = '', ...props }) => {
  const [focused, setFocused] = useState(false)
  const isActive = focused || value.length > 0
  return (
    <div className={`wrapper ${isActive ? 'active' : ''}`}>
      <label className={`label ${isActive ? 'active' : ''}`}>{label}</label>
      <input
        className='input'
        value={value}
        {...props}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  )
}

export default Input
