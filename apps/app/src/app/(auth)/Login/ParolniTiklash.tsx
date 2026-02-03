import { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AppInput from 'src/components/AppInput/input'
import PageHeader from 'src/components/header/PageHeader'
import { Colors, Spacing } from 'src/shared/token'

export const ParolniTiklash = () => {
  const [form, setForm] = useState({
    TelefonRaqam: ''
  })
  return (
    <View>
        <PageHeader title='Parolni tiklash'/>
      
    <KeyboardAwareScrollView contentContainerStyle={{
      paddingHorizontal: Spacing.horizontal, gap: Spacing.horizontal
    }}>
    <View style={styles.Box}>
      <AppInput
      label="Telefon raqam"
      value={form.TelefonRaqam}
      onChangeText={(text: string) => 
      setForm({ ...form, TelefonRaqam: text})}
      />
    </View>
    <View >
      <TouchableOpacity style={styles.touch}>
        <Text style={styles.touchText}>Dasturga Kirish</Text>
      </TouchableOpacity>
      </View>
      
    </KeyboardAwareScrollView>
    </View>
    
  )
}

export default ParolniTiklash

const styles = StyleSheet.create({
  Box: {
    width: '100%'
  },
  touchBox: {
    position: 'relative',
    },
    touch: {
      width: "100%",
      height: 58,
      borderColor: Colors.primary,
      borderWidth: 1,
      borderRadius: 18,
      justifyContent: 'center', 
      alignItems: 'center',
      position: 'absolute',
      top: 380
    },
    touchText: {
      fontSize: 18,
      color: Colors.textPrimary,
    }
})