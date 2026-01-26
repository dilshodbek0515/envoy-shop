import Dropdown from '../../../../../shared/ui/dropdown/dropdown'
import Input from '../../../../../shared/ui/input/MainInput/input'
import InputPhone from '../../../../../shared/ui/input/InputPhone/InputPhone'
import './yuridik.css'
const Yuridik = ({ form, handleChange, options, handleSelectFaoliyat }) => {
  return (
    <form className='yuridik_grid'>
      <Input
        label={'Ism'}
        name='ism'
        value={form.ism}
        type='text'
        onChange={handleChange}
      />
      <Input
        label={'Familiya'}
        name='familiya'
        value={form.familiya}
        type='text'
        onChange={handleChange}
      />
      <InputPhone
        label={'Telefon raqam'}
        name='telefon'
        value={form.telefon}
        type='number'
        onChange={handleChange}
      />
      <Dropdown
        value={form.faoliyat}
        options={options}
        onChange={handleSelectFaoliyat}
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
        type='number'
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
        type='number'
        onChange={handleChange}
      />
    </form>
  )
}

export default Yuridik
