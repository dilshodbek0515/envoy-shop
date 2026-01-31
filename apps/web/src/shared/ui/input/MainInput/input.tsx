'use client'
import { useState } from 'react'
import './input.css'
import '../inputGlobal.css'
import CloseIcon from 'apps/web/src/features/auth/assets/icons/close'

interface MainInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  value: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
}

const MainInput: React.FC<MainInputProps> = ({
  label,
  value,
  handleChange,
  type = 'text',
  ...props
}) => {
  const [focused, setFocused] = useState(false)
  const isActive = focused || value.length > 0
  const clear = value.length > 0

  const handleClear = () => {
    const fakeEvent = {
      target: {
        name: props.name,
        value: ''
      }
    } as unknown as React.ChangeEvent<HTMLInputElement>
    handleChange(fakeEvent)
  }

  return (
    <div className={`wrapperI ${isActive ? 'active' : ''}`}>
      <label className={`label ${isActive ? 'active' : ''}`}>{label}</label>
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
