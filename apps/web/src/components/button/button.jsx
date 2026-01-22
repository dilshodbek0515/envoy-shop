import './button.css'

const Button = ({ label, ...props }) => {
  return (
    <button {...props} className='bottom_btn'>
      {label}
    </button>
  )
}

export default Button
