import './button.css'
const Button = ({ label, handleSubmit, type = 'button', disabled = false }) => {
  return (
    <button
      type={type}
      onClick={handleSubmit}
      disabled={disabled}
      className={`web_button ${disabled && 'disabled'}`}
    >
      {label}
    </button>
  )
}

export default Button
