import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import PasswordInput from "src/components/PasswordInput/PasswordInput";
import PhoneInput from "src/components/PhoneInput/PhoneInput";
import { Colors, Spacing } from "src/shared/token";
import ButtonApp from "src/shared/ui/Button/button";
import { z } from "zod";
import { LoginFn } from "../../../../../../packages/api/login/login"
import AsyncStorage from "@react-native-async-storage/async-storage";


const loginSchema = z.object({
  phone: z.string().min(9, "Telefon raqam 9 ta raqamdan kam bo'lmasligi kerak "),
  password: z.string().min(8, "Parol 8 ta belgidan kam bo'lmasligi kerak "),
 });

export default function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ phone?: string; password?: string}>( {});
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false)
  // const isValid = phone.replace(/\D/g, '').length === 9 && password.length >= 8;
  
  useEffect(() => {
    setIsValid(phone.replace(/\D/g, '').length === 9 && password.length >= 8)
  }, [phone, password])
  
  const handleLogin = async () => {
    const result = loginSchema.safeParse({phone, password});
    
    if (!result.success) {
      const fieldErrors: { phone?: string; password?: string} = {};
      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as "phone" | "password";
        fieldErrors[fieldName] = issue.message;
      });
      setErrors(fieldErrors);
      return
  };
  
  try {
    setLoading (true)
    setErrors({})
    
    const data = await LoginFn({ phone: `+998${phone}`, password});
    
    await AsyncStorage.setItem("access_token", data.token.access)
    await AsyncStorage.setItem("refresh_token", data.token.refresh)
    
    router.replace("")
  } catch (error: any) {
    Alert.alert("Xatolik", "Telefon raqam yoki parol noto'g'ri")
  }finally {
    setLoading(false)
  }
  
  }
 

  return (
    <View style={styles.container}>
      <View style={{paddingHorizontal: Spacing.horizontal}}>
      <PhoneInput 
      label="Telefon raqam" 
      value={phone} 
      onChangeText={(text) => {
        setPhone(text);
        setErrors((prev) => ({ ...prev, phone: undefined}))}}
      error={errors.phone}
      /> 
      
        <PasswordInput 
        label="Parol" 
        value={password}
        onChangeText={(text: string) => {
          setPassword(text);
          setErrors(((prev) => ({ ...prev, password: undefined})))
        }}
        error={errors.password}/>
      </View>
      <Pressable
      style={styles.linkTitle}
       onPress={() => router.push("../resetPassword/interPassword/inter-password")}>
        <Text style={styles.title}>Parol esingizdami ?</Text>
      </Pressable>
      
      <View style={{flex: 1, alignItems: 'flex-end', padding: Spacing.horizontal}}>
            <ButtonApp 
            label={loading ? "Loading..." : "Dasturga kirish"}
            // label="Dasturga kirish"
            onPress={handleLogin}
            disabled={!isValid || loading}
            loading={loading}
            style={{
               backgroundColor: !isValid ? "#262E3D" : Colors.primary,
            }}
            /> 
          </View>
    </View>
  );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
 },
 title: {
  color: Colors.primary,
  fontSize: 14
 },
 linkTitle: {
  paddingHorizontal: Spacing.horizontal,
  alignItems: "flex-end",
  marginTop: 10,
  
 }
});

