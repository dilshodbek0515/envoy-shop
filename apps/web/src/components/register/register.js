import './register.css'
const Register = () => {
  return (
    <div className='container'>
      <div className='register_box'>
        <div className='top_box'>
          <div className='login_selected'>Kirish</div>
          <div className='register_selected'>Ro'yxatdan o'tish</div>
        </div>

        <div className='center_box'>
          <div className='role_select'>
            <button className='yuridik'>Yuridik</button>
            <button className='jismoniy'>Jismoniy</button>
          </div>
          <div className='forma'>
            <input className='inputs' type='text' placeholder='Ism' required />
            <input
              className='inputs'
              type='text'
              placeholder='Familiya'
              required
            />
            <input
              className='inputs'
              type='number'
              placeholder='Telefon raqam'
              required
            />
            <input
              className='inputs'
              type='email'
              placeholder='Elektron pochta'
              required
            />
            <input
              className='inputs'
              type='password'
              placeholder='Parol'
              required
            />
          </div>
        </div>

        <button className='bottom_btn'>Ro'yxatdan o'tish</button>
      </div>
    </div>
  )
}

export default Register
