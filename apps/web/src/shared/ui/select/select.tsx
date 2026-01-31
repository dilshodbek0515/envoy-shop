'use client'
import { useEffect, useRef, useState } from 'react'
import { clsx } from 'clsx'
import styles from './select.module.css'

interface Option {
  value: string
  label: string
}

interface CustomSelectProps {
  value: string
  onChange: (value: string) => void
  options: Option[]
  label: string
  error?: string
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  options,
  label,
  error
}) => {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const selected = options.find(o => o.value === value)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className={styles.role_wrapper} ref={ref}>
      <div className={clsx(styles.inputBox, error && styles.inputBoxError)}>
        <input
          readOnly
          value={selected?.label || ''}
          placeholder=' '
          className={styles.input}
          onClick={() => setOpen(prev => !prev)}
        />
        <label className={styles.label}>{label}</label>
        <span
          className={clsx(styles.arrow, open && styles.arrowOpen)}
          onClick={() => setOpen(prev => !prev)}
        >
          ▾
        </span>
        {open && (
          <div className={styles.dropdown}>
            {options.map(opt => (
              <div
                key={opt.value}
                className={styles.option}
                onClick={() => {
                  onChange(opt.value)
                  setOpen(false)
                }}
              >
                {opt.label}
              </div>
            ))}
          </div>
        )}
      </div>
      <span
        className={clsx(
          styles.error,
          error ? styles.errorOpen : styles.errorClose
        )}
      >
        {error}
      </span>
    </div>
  )
}

export default CustomSelect
