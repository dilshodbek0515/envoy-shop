'use client'
import { useState } from 'react'
import './InputPhone.css'
import '../inputGlobal.css'
import CloseIcon from '../../../../features/auth/assets/icons/close'

const MAX_LENGTH = 9

const formatPhone = value => {
  if (!value) return ''

  let v = value
  if (v.length > 2) v = v.slice(0, 2) + ' ' + v.slice(2)
  if (v.length > 6) v = v.slice(0, 6) + ' ' + v.slice(6)
  if (v.length > 9) v = v.slice(0, 9) + ' ' + v.slice(9)
  return v
}

const InputPhone = ({
  label,
  name = 'phone',
  value = '',
  handleChange,
  ...props
}) => {
  const [focused, setFocused] = useState(false)
  const isActive = focused || value.length > 0

  const onChange = e => {
    const onlyNumbers = e.target.value.replace(/\D/g, '').slice(0, MAX_LENGTH)

    handleChange?.({
      target: {
        name,
        value: onlyNumbers
      }
    })
  }

  const clear = () => {
    handleChange?.({
      target: {
        name,
        value: ''
      }
    })
  }

  return (
    <div className={`wrapperIP ${isActive ? 'active' : ''}`}>
      <label className={`label ${isActive ? 'active' : ''}`}>{label}</label>

      <div className='inputContainer'>
        <span className={`prefix ${isActive ? 'show' : ''}`}>+998</span>

        <input
          {...props}
          type='tel'
          className={`inputt ${isActive ? 'active' : ''}`}
          value={formatPhone(value)}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          inputMode='numeric'
          autoComplete='off'
        />

        {value && (
          <button
            type='button'
            className='closeButton show'
            onMouseDown={e => e.preventDefault()}
            onClick={clear}
          >
            <CloseIcon className='close' />
          </button>
        )}
      </div>
    </div>
  )
}

export default InputPhone
