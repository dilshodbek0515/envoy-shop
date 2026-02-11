import './button.css'

interface ButtonProps {
  label: string | any
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
}

const Button: React.FC<ButtonProps> = ({
  label,
  type = 'button',
  disabled = false,
  loading = false
}) => {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`web_button ${disabled ? 'disabled' : ''}`}
    >
      {loading ? (
        <span className='btn_loader'>
          <span className='spinner' />
        </span>
      ) : (
        label
      )}
    </button>
  )
}

export default Button
