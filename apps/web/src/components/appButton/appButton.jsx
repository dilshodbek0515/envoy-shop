import './appButton.css'

const AppButton = ({ label, ...props }) => {
  return (
    <button {...props} className='bottom_btn'>
      {label}
    </button>
  )
}

export default AppButton
