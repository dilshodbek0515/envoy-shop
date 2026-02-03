'use client'
import React, { forwardRef, useState } from 'react'
import './PasswordInput.css'
import CloseIcon from 'apps/web/src/features/auth/assets/icons/close'
import OpenEyeIcon from 'apps/web/src/features/auth/assets/icons/open-eye-icon'
import CloseEyeIcon from 'apps/web/src/features/auth/assets/icons/close-eye-icon'

interface PasswordInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'onBlur' | 'type'
  > {
  label: string
  value: string
  onChange?: (value: string) => void
  onBlur?: () => void
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, value, onChange, onBlur, ...props }, ref) => {
    const [focused, setFocused] = useState(false)
    const [show, setShow] = useState(false)

    const hasValue = value.length > 0
    const showLabel = focused || hasValue
    const showTools = hasValue

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
      onChange?.(e.target.value)

    const clear = () => onChange?.('')
    const toggle = () => setShow(v => !v)

    return (
      <div className={`wrapperP ${focused ? 'active' : ''}`}>
        <label className={`labelP ${showLabel ? 'active' : ''}`}>{label}</label>

        <input
          {...props}
          ref={ref}
          type={show ? 'text' : 'password'}
          value={value}
          onChange={handleChange}
          className='password_input with_tools'
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false)
            onBlur?.()
          }}
        />

        {/* RIGHT TOOLS BLOCK */}
        <div className={`tools ${showTools ? 'show' : ''}`}>
          <button
            type='button'
            onClick={toggle}
            onMouseDown={e => e.preventDefault()}
          >
            {show ? <CloseEyeIcon /> : <OpenEyeIcon />}
          </button>

          <span className='tools_line' />

          <button
            type='button'
            onClick={clear}
            onMouseDown={e => e.preventDefault()}
          >
            <CloseIcon />
          </button>
        </div>
      </div>
    )
  }
)

PasswordInput.displayName = 'PasswordInput'
export default PasswordInput
