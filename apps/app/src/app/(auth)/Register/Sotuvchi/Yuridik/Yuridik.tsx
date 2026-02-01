import { useState } from "react";
import { Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AppInput from "src/components/AppInput/input";
import PasswordInput from "src/components/PasswordInput/PasswordInput";
import { Spacing } from "src/shared/token";

const Yuridik = () => {
  const [form, setForm] = useState({
    korxona: "",
    inn: "",
    manzil: "",
    bank: "",
    parol: "",
    Qaytaparol: "",
    TelefonRaqam: "",
    Kompaniya: "",
  });

  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      enableAutomaticScroll
      extraScrollHeight={Platform.OS === "android" ? 120 : 40}
      keyboardOpeningTime={0}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        padding: Spacing.horizontal,
        gap: Spacing.horizontal,
        paddingBottom: 120,
      }}
    >
      <AppInput
        label="Kompaniya"
        value={form.Kompaniya}
        onChangeText={(text: string) => setForm({ ...form, Kompaniya: text })}
      />

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

      <AppInput
        label="Telefon raqam"
        value={form.TelefonRaqam}
        onChangeText={(text: string) =>
          setForm({ ...form, TelefonRaqam: text })
        }
      />

      <PasswordInput
        label="Parol"
        value={form.parol}
        onChangeText={(text: string) => setForm({ ...form, parol: text })}
      />

      <PasswordInput
        label="Qayta parol"
        value={form.Qaytaparol}
        onChangeText={(text: string) => setForm({ ...form, Qaytaparol: text })}
      />
    </KeyboardAwareScrollView>
  );
};

export default Yuridik;
