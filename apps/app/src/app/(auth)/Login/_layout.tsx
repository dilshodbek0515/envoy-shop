import { StyleSheet, Text, View } from 'react-native'
import { Stack } from 'expo-router'
const LoginLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: '#fff'
        }
      }}
    />
  )
}

export default LoginLayout

const styles = StyleSheet.create({})
