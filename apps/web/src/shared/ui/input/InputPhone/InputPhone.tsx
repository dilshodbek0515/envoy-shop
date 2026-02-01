'use client'
import { useState } from 'react'
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

interface InputPhoneProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  name?: string
  value: string
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputPhone: React.FC<InputPhoneProps> = ({
  label,
  name = 'phone',
  value = '',
  handleChange,
  ...props
}) => {
  const [focused, setFocused] = useState<boolean>(false)
  const hasValue = value.length > 0
  const shouldShowLabel = focused || hasValue

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNumbers = e.target.value.replace(/\D/g, '').slice(0, MAX_LENGTH)

    if (handleChange) {
      handleChange({
        target: {
          name,
          value: onlyNumbers
        }
      } as React.ChangeEvent<HTMLInputElement>)
    }
  }

  const clear = () => {
    if (handleChange) {
      handleChange({
        target: {
          name,
          value: ''
        }
      } as React.ChangeEvent<HTMLInputElement>)
    }
  }

  const handleBlur = () => {
    setFocused(false)
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
          type='tel'
          className={`inputt ${focused ? 'active' : ''}`}
          value={formatPhone(value)}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={handleBlur}
          inputMode='numeric'
          autoComplete='off'
        />

        {hasValue && (
          <button
            type='button'
            className={`closeButton show ${focused ? 'active' : ''}`}
            onMouseDown={e => e.preventDefault()}
            onClick={clear}
          >
            <CloseIcon />
          </button>
        )}
      </div>
    </div>
  )
}

export default InputPhone
