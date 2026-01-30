import { useState } from "react";
import { ScrollView, View } from "react-native";
import AppInput from "src/components/input";
import { Spacing } from "src/shared/token";

const Yuridik = () => {
  const [form, setForm] = useState({
    korxona: "",
    inn: "",
    manzil: "",
    bank: "",
  });

  return (
    <ScrollView
      style={{ flex: 1 }}
      scrollEnabled={true}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
        paddingHorizontal: Spacing.horizontal,
        paddingVertical: 16,
      }}
    >
      <AppInput
        label="Korxona nomi"
        value={form.korxona}
        onChangeText={(text: string) => setForm({ ...form, korxona: text })}
      />
      <AppInput
        label="Stir (INN)"
        value={form.inn}
        onChangeText={(text: string) => setForm({ ...form, inn: text })}
      />
      <AppInput
        label="Yuridik manzil"
        value={form.manzil}
        onChangeText={(text: string) => setForm({ ...form, manzil: text })}
      />
      <AppInput
        label="Bank rekvizitlari"
        value={form.bank}
        onChangeText={(text: string) => setForm({ ...form, bank: text })}
      />
    </ScrollView>
  );
};

export default Yuridik;
