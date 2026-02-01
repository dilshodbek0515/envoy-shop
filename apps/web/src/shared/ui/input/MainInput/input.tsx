'use client'
import { useState, forwardRef } from 'react'
import './input.css'
import '../inputGlobal.css'
import CloseIcon from 'apps/web/src/features/auth/assets/icons/close'

interface MainInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'onBlur'> {
  label: string
  value: string
  onChange?: (value: string) => void
  onBlur?: () => void
  type?: string
}

const MainInput = forwardRef<HTMLInputElement, MainInputProps>(
  ({ label, value, onChange, onBlur, type = 'text', ...props }, ref) => {
    const [focused, setFocused] = useState(false)
    const hasValue = value.length > 0
    const shouldShowLabel = focused || hasValue

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e.target.value)
      }
    }

    const handleClear = () => {
      if (onChange) {
        onChange('')
      }
    }

    const handleFocus = () => {
      setFocused(true)
    }

    const handleBlur = () => {
      setFocused(false)
      if (onBlur) {
        onBlur()
      }
    }

    return (
      <div className={`wrapperI ${focused ? 'active' : ''}`}>
        <label className={`label ${shouldShowLabel ? 'active' : ''}`}>
          {label}
        </label>
        <input
          {...props}
          ref={ref}
          type={type}
          value={value}
          onChange={handleChange}
          className='main_input'
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {hasValue && (
          <button
            type='button'
            className={`clear_btn show ${focused ? 'active' : ''}`}
            onClick={handleClear}
            onMouseDown={e => e.preventDefault()}
          >
            <CloseIcon />
          </button>
        )}
      </div>
    )
  }
)

MainInput.displayName = 'MainInput'

export default MainInput
