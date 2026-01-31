import './button.css'

interface ButtonProps {
  label: string
  handleSubmit: any
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
  label,
  handleSubmit,
  type = 'button',
  disabled = false
}) => {
  return (
    <button
      type={type}
      onClick={handleSubmit}
      disabled={disabled}
      className={`web_button ${disabled ? 'disabled' : ''}`}
    >
      {label}
    </button>
  )
}

export default Button
