
import { Stack } from 'expo-router'
import { Colors } from 'src/shared/token'


export const LoginLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {backgroundColor: Colors.pageBackground}
      }}
    />
  )
}

export default LoginLayout

