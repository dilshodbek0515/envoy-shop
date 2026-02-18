'use client'
import { useState, forwardRef } from 'react'
import './InputPhone.css'
import '../inputGlobal.css'
import CloseIcon from 'apps/web/src/features/auth/assets/icons/close'

const MAX_LEN = 9

const digits = (v: string) => v.replace(/\D/g, '').slice(0, MAX_LEN)

const formatPhone = (v: string) =>
  digits(v).replace(/(\d{2})(\d{3})(\d{2})(\d{0,2})/, (_, a, b, c, d) =>
    [a, b, c, d].filter(Boolean).join(' ')
  )

interface InputPhoneProps extends Omit< React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'onBlur' > {
  label: string
  value: string
  onChange?: (value: string) => void
  onBlur?: () => void
  error?: boolean
}

const InputPhone = forwardRef<HTMLInputElement, InputPhoneProps>(
  ({ label, value, onChange, onBlur, error, ...props }, ref) => {
    const [focused, setFocused] = useState(false)

    const raw = digits(value)
    const formatted = formatPhone(raw)

    const hasValue = raw.length > 0
    const showLabel = focused || hasValue
    const showPrefix = focused || hasValue

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(digits(e.target.value))
    }

    const handleClear = () => onChange?.('')

    return (
      <div
        className={`wrapperI ${focused ? 'active' : ''} 
        ${error ? 'error' : ''}`}
      >
        <label className={`label ${showLabel ? 'active' : ''}`}>{label}</label>
        <span className={`prefix ${showPrefix ? 'show' : ''}`}>
          <span className='code'>+998</span>
          <span className='divider' />
        </span>

        <input
          {...props}
          ref={ref}
          type='tel'
          inputMode='numeric'
          autoComplete='off'
          value={formatted}
          onChange={handleChange}
          className={`main_input ${showPrefix ? 'with_prefix' : ''}`}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false)
            onBlur?.()
          }}
        />

        <button
          type='button'
          className={`clear_btn ${hasValue ? 'show' : ''} ${
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
)

InputPhone.displayName = 'InputPhone'
export default InputPhone
