import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import PhoneInput from 'src/components/PhoneInput/PhoneInput'
import PageHeader from 'src/components/header/PageHeader'
import { Spacing } from 'src/shared/token'

export const ParolniTiklash = () => {
  const [form, setForm] = useState({
    TelefonRaqam: ''
  })
  return (
    <View>
        <PageHeader title='Parolni tiklash' isEnabledBack/>
        
    <KeyboardAwareScrollView contentContainerStyle={{
      paddingHorizontal: Spacing.horizontal, gap: Spacing.horizontal
    }}>
    <View style={styles.Box}>
      <PhoneInput
      label="Telefon raqam"
      value={form.TelefonRaqam}
      onChangeText={(text: string) => 
      setForm({ ...form, TelefonRaqam: text})}
      />
    </View>
    </KeyboardAwareScrollView>
    </View>
    
  )
}

export default ParolniTiklash

const styles = StyleSheet.create({
  Box: {
    width: '100%'
  }
})