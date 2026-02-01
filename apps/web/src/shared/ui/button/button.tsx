import './button.css'

interface ButtonProps {
  label: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
  label,
  type = 'button',
  disabled = false
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`web_button ${disabled ? 'disabled' : ''}`}
    >
      {label}
    </button>
  )
}

export default Button
