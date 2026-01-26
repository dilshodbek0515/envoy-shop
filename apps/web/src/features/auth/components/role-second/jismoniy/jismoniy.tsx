const Jismoniy = () => {
  return (
    <div className='forma'>
      <input className='inputs' type='text' placeholder='Ism' required />
      <input className='inputs' type='text' placeholder='Familiya' required />
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
      <input className='inputs' type='password' placeholder='Parol' required />
    </div>
  )
}

export default Jismoniy
