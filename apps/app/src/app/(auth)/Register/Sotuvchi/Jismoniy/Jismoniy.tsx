import { useState } from 'react'
import { Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AppInput from 'src/components/AppInput/input'
import PasswordInput from 'src/components/PasswordInput/PasswordInput'
import PhoneInput from 'src/components/PhoneInput/PhoneInput'
import { Spacing } from 'src/shared/token'

const Jismoniy = () => {
  const [form, setForm] = useState({
    Ism: '',
    Familiya: '',
    Elektron_pochta: '',
    Parol: ''
  })

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        paddingHorizontal: Spacing.horizontal,
        gap: Spacing.horizontal
      }}
    >
      <AppInput
        label='Ism'
        value={form.Ism}
        onChangeText={(text: string) => setForm({ ...form, Ism: text })}
      />

      <AppInput
        label='Familiya'
        value={form.Familiya}
        onChangeText={(text: string) => setForm({ ...form, Familiya: text })}
      />

      <PhoneInput />

      <AppInput
        label='Elektron pochta'
        value={form.Elektron_pochta}
        onChangeText={(text: string) =>
          setForm({ ...form, Elektron_pochta: text })
        }
      />

      <PasswordInput
        label='Parol'
        value={form.Parol}
        onChangeText={(text: string) => setForm({ ...form, Parol: text })}
      />
    </KeyboardAwareScrollView>
  )
}

export default Jismoniy
