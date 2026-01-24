import Input from '../../../input/input'
import Dropdown from '../../../dropdown/dropdown'

const Yuridik = ({ form, handleChange, options, handleSelectFaoliyat }) => {
  return (
    <form className='yuridik_grid'>
      <Dropdown
        value={form.faoliyat}
        options={options}
        onChange={handleSelectFaoliyat}
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
