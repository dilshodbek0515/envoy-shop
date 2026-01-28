import './button.css'
import Link from 'next/link'
const Button = ({ label, path }) => {
  return (
    <Link href={path} className='web_button'>
      {label}
    </Link>
  )
}

export default Button
