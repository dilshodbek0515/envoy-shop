import Dropdown from "../../../../../shared/ui/dropdown/dropdown";
import Input from "../../../../../shared/ui/input/MainInput/input";
import "./yuridik.css";
const Yuridik = ({ form, handleChange, options, handleSelectFaoliyat }) => {
  return (
    <form className="yuridik_grid">
      <Input
        label={"Ism"}
        name="ism"
        value={form.ism}
        type="text"
        onChange={handleChange}
        // error={errors.ism}
      />
      <Input
        label={"Familiya"}
        name="familiya"
        value={form.familiya}
        type="text"
        onChange={handleChange}
        // error={errors.familiya}
      />
      <Input
        label={"Telefon raqam"}
        name="telefon"
        value={form.telefon}
        type="number"
        onChange={handleChange}
        // error={errors.telefon}
      />
      <Dropdown
        value={form.faoliyat}
        options={options}
        onChange={handleSelectFaoliyat}
      />
      <Input
        label={"Parol"}
        name="parol"
        value={form.parol}
        type="text"
        onChange={handleChange}
        // error={errors.parol}
      />
      <Input
        label={"Parolni qayta kiriting"}
        name="qaytaParol"
        value={form.qaytaParol}
        type="text"
        onChange={handleChange}
        // error={errors.qaytaParol}
      />
      <Input
        label={"Korxona nomi"}
        name="korxona"
        value={form.korxona}
        type="text"
        onChange={handleChange}
        // error={errors.korxona}
      />
      <Input
        label={"Stir (INN)"}
        name="stir"
        value={form.stir}
        type="number"
        onChange={handleChange}
        // error={errors.stir}
      />
      <Input
        label={"Yuridik manzil"}
        name="yuridik"
        value={form.yuridik}
        type="text"
        onChange={handleChange}
        // error={errors.yuridik}
      />
      <Input
        label={"Bank rekvizitlari"}
        name="bank"
        value={form.bank}
        type="number"
        onChange={handleChange}
        // error={errors.bank}
      />
    </form>
  );
};

export default Yuridik;
