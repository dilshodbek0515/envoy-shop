import { router } from 'expo-router'
import { useState } from 'react'
import { Pressable, StyleSheet, Text, View} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import PasswordInput from 'src/components/PasswordInput/PasswordInput'
import PhoneInput from 'src/components/PhoneInput/PhoneInput'
import { Colors, Spacing } from 'src/shared/token'



export default function Login() {
  
const [phone, setPhone] = useState("");
const [password, setPassword] = useState("")


  return (
    <KeyboardAwareScrollView
    contentContainerStyle={{
      paddingHorizontal: Spacing.horizontal, gap: Spacing.horizontal, 
    }} >
      <View style={styles.Box}>
      <PhoneInput
      onChangeText={setPhone}
      value={phone}
       />
      
    <PasswordInput
    label="Parol"
    value={password}
    onChangeText={setPassword}
    
    />
      </View>
      <Pressable onPress={() =>router.push('../Login/ParolniTiklash')}>
    <Text style={styles.text}>Parolni tiklash</Text>
      </Pressable>
    </KeyboardAwareScrollView>
  )
}


const styles = StyleSheet.create({
Box: {
  width: 380,
},

text: {
 color: Colors.primary,
 fontSize: 14,
textAlign: "right"
}
})
