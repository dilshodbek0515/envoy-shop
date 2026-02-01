'use client'
import { useState, forwardRef } from 'react'
import './InputPhone.css'
import '../inputGlobal.css'
import CloseIcon from '../../../../features/auth/assets/icons/close'

const MAX_LENGTH = 9

const formatPhone = (value: string): string => {
  if (!value) return ''

  let v = value
  if (v.length > 2) v = v.slice(0, 2) + ' ' + v.slice(2)
  if (v.length > 6) v = v.slice(0, 6) + ' ' + v.slice(6)
  if (v.length > 9) v = v.slice(0, 9) + ' ' + v.slice(9)
  return v
}

type InputPhoneProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'onBlur'> & {
  label: string
  name?: string
  value: string
  onChange?: (value: string) => void
  onBlur?: () => void
}

const InputPhone = forwardRef<HTMLInputElement, InputPhoneProps>(
  ({ label, name = 'phone', value = '', onChange, onBlur, ...props }, ref) => {
    const [focused, setFocused] = useState<boolean>(false)
    const hasValue = value.length > 0
    const shouldShowLabel = focused || hasValue

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const onlyNumbers = e.target.value.replace(/\D/g, '').slice(0, MAX_LENGTH)
      if (onChange) {
        onChange(onlyNumbers)
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
      <div className={`wrapperIP ${focused ? 'active' : ''}`}>
        <label className={`label ${shouldShowLabel ? 'active' : ''}`}>
          {label}
        </label>

        <div className='inputContainer'>
          <span className={`prefix ${focused || hasValue ? 'show' : ''}`}>
            +998
          </span>

          <input
            {...props}
            ref={ref}
            type='tel'
            className={`inputt ${focused ? 'active' : ''}`}
            value={formatPhone(value)}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            inputMode='numeric'
            autoComplete='off'
            name={name}
          />

          {hasValue && (
            <button
              type='button'
              className={`closeButton show ${focused ? 'active' : ''}`}
              onMouseDown={e => e.preventDefault()}
              onClick={handleClear}
            >
              <CloseIcon />
            </button>
          )}
        </div>
      </div>
    )
  }
)

InputPhone.displayName = 'InputPhone'

export default InputPhone
