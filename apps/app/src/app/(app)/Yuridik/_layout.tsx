import { Stack } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'
import { Colors } from 'src/shared/token'

const _layout = () => {
  return (
   <Stack screenOptions={{
    headerShown: false,
    contentStyle: {backgroundColor: Colors.pageBackground}
   }}>
    
   </Stack>
  )
}

export default _layout

const styles = StyleSheet.create({})