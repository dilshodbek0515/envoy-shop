import Input from '../../../input/input'

const Yuridik = ({ form, handleChange }) => {
  return (
    <form className='yuridik_grid'>
      <Input
        label={'Faoliyat turi'}
        name='faoliyat'
        value={form.faoliyat}
        type='text'
        onChange={handleChange}
      />
      <Input
        label={'Korxona nomi'}
        name='korxona'
        value={form.korxona}
        type='text'
        onChange={handleChange}
      />
      <Input
        label={'Stir (INN)'}
        name='stir'
        value={form.stir}
        type='text'
        onChange={handleChange}
      />
      <Input
        label={'Yuridik manzil'}
        name='yuridik'
        value={form.yuridik}
        type='text'
        onChange={handleChange}
      />
      <Input
        label={'Bank rekvizitlari'}
        name='bank'
        value={form.bank}
        type='text'
        onChange={handleChange}
      />
      <Input
        label={'Telefon raqam'}
        name='telefon'
        value={form.telefon}
        type='text'
        onChange={handleChange}
      />
      <Input
        label={'Parol'}
        name='parol'
        value={form.parol}
        type='text'
        onChange={handleChange}
      />
      <Input
        label={'Parolni qayta kiriting'}
        name='qaytaParol'
        value={form.qaytaParol}
        type='text'
        onChange={handleChange}
      />
    </form>
  )
}

export default Yuridik
