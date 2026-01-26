'use client'
import './dropdown.css'
import ChevronTop from '../../../features/auth/assets/icons/chevron-top'
import ChevronBottom from '../../../features/auth/assets/icons/chevron-bottom'
import { useState } from 'react'

const Dropdown = ({ options, value, onChange }) => {
  const [dropOpen, setDropOpen] = useState(false)

  const toggleDropDown = () => {
    setDropOpen(!dropOpen)
  }

  const handleSelect = selectedValue => {
    setDropOpen(false)
    onChange(selectedValue)
  }

  const isSelected = value && value !== 'Faoliyat turi'

  return (
    <div className='wrapper'>
      <div
        className={`box ${dropOpen ? 'open' : ''} ${
          isSelected ? 'selected' : ''
        }`}
        onClick={toggleDropDown}
      >
        <label className='labell'> {value || 'Faoliyat turi'}</label>
        {!dropOpen ? <ChevronTop /> : <ChevronBottom />}
      </div>

      <div className={`options ${dropOpen ? 'open' : ''}`}>
        {options.map((option, index) => (
          <div
            key={index}
            className='option-item'
            onClick={() => handleSelect(option)}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dropdown
