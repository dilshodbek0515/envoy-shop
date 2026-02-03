import { router } from 'expo-router'
import { useState } from 'react'
import { Pressable, StyleSheet, Text, Touchable, TouchableOpacity, View} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AppInput from 'src/components/AppInput/input'
import { Colors, Screens, Spacing } from 'src/shared/token'

const Login = () => {
  const [form, setForm] = useState({
    TelefonRaqam: "",
    Parol: ""
  })
  
  return (
    <KeyboardAwareScrollView
    contentContainerStyle={{
      paddingHorizontal: Spacing.horizontal, gap: Spacing.horizontal, 
    }} >
      <View style={styles.Box}>
        
    <AppInput
    label="Telefon raqam"
    value={form.TelefonRaqam}
    onChangeText={(text:string) => 
    setForm({ ...form, TelefonRaqam: text})}
    />
    <AppInput
    label="Parol"
    value={form.Parol}
    onChangeText={(text: string) => 
    setForm({ ...form, Parol: text})}
    />
      </View>
      <Pressable onPress={() =>router.replace('../Login/ParolniTiklash')}>
    <Text style={styles.Text}>Parolni tiklash</Text>
      </Pressable>
      
      <View style={styles.touchBox}>
      <TouchableOpacity style={styles.touch}>
        <Text style={styles.touchText}>Dasturga Kirish</Text>
      </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  )
}

export default Login

const styles = StyleSheet.create({
Box: {
  width: 380,
},
Text: {
 color: Colors.primary,
 fontSize: 14,
textAlign: "right"
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
