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
  const hasValue = value.length > 0
  const shouldShowLabel = focused || hasValue
  const clear = hasValue

  const handleClear = () => {
    const fakeEvent = {
      target: {
        name: props.name,
        value: ''
      }
    } as unknown as React.ChangeEvent<HTMLInputElement>
    handleChange(fakeEvent)
  }

  const handleBlur = () => {
    setFocused(false)
  }

  return (
    <div className={`wrapperI ${focused ? 'active' : ''}`}>
      <label className={`label ${shouldShowLabel ? 'active' : ''}`}>
        {label}
      </label>
      <input
        type={type}
        {...props}
        value={value}
        onChange={handleChange}
        className='main_input'
        onFocus={() => setFocused(true)}
        onBlur={handleBlur}
      />
      <button
        type='button'
        className={`clear_btn ${clear ? 'show' : ''} ${
          focused ? 'active' : ''
        }`}
        onClick={handleClear}
        onMouseDown={e => e.preventDefault()}
      >
        <CloseIcon />
      </button>
    </div>
  )
}

export default MainInput
