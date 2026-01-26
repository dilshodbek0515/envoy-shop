'use client'
import MainInput from '../../../../../shared/ui/input/MainInput/input'
import InputPhone from '../../../../../shared/ui/input/InputPhone/InputPhone'
const Jismoniy = ({ form, handleChange }) => {
  return (
    <div className='yuridik_grid'>
      <MainInput
        label={'Ism'}
        name='jismoniy_ism'
        value={form.jismoniy_ism}
        type='text'
        onChange={handleChange}
      />
      <MainInput
        label={'Familiya'}
        name='jismoniy_familiya'
        value={form.jismoniy_familiya}
        type='text'
        onChange={handleChange}
      />
      <InputPhone
        label={'Telefon raqam'}
        name='jismoniy_telefon'
        value={form.jismoniy_telefon}
        type='number'
        onChange={handleChange}
      />
      <MainInput
        label={'Elektron pochta'}
        name='jismoniy_email'
        value={form.jismoniy_email}
        type='email'
        onChange={handleChange}
      />
      <MainInput
        label={'Parol'}
        name='jismoniy_parol'
        value={form.jismoniy_parol}
        type='password'
        onChange={handleChange}
      />
      <MainInput
        label={'Qayta Parol'}
        name='jismoniy_qaytaParol'
        value={form.jismoniy_qaytaParol}
        type='password'
        onChange={handleChange}
      />
    </div>
  )
}

export default Jismoniy
