'use client'
import React, { useRef } from 'react'
import './SmsCodeInput.css'

interface Props {
  value: string
  onChange: (v: string) => void
}

const SmsCodeInput: React.FC<Props> = ({ value, onChange }) => {
  const refs = useRef<Array<HTMLInputElement | null>>([])

  const digits = value.padEnd(4, ' ').slice(0, 4).split('')

  const focus = (i: number) => {
    refs.current[i]?.focus()
    refs.current[i]?.select()
  }

  const handleChange = (i: number, v: string) => {
    const d = v.replace(/\D/g, '').slice(-1)
    if (!d) return

    const arr = value.split('').slice(0, 4)
    arr[i] = d
    const next = arr.join('').slice(0, 4)

    onChange(next)

    if (i < 3) focus(i + 1)
  }

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace') {
      if (digits[i]?.trim()) {
        const arr = value.split('')
        arr[i] = ''
        onChange(arr.join(''))
      } else if (i > 0) {
        focus(i - 1)
      }
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4)
    onChange(text)
    focus(Math.min(text.length, 3))
  }

  return (
    <div className='sms_code_row'>
      {digits.map((d, i) => (
        <input
          key={i}
          ref={el => {
            refs.current[i] = el
          }}
          className='sms_digit_input'
          inputMode='numeric'
          maxLength={1}
          value={d.trim()}
          onChange={e => handleChange(i, e.target.value)}
          onKeyDown={e => handleKeyDown(i, e)}
          onPaste={handlePaste}
        />
      ))}
    </div>
  )
}

export default SmsCodeInput
