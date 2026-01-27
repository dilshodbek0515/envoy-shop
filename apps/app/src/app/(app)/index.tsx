import { StyleSheet, Text, View } from 'react-native'

const Index = () => {
  return (
    <View>
     <Link 
     style={styles.login}
     href={'/Login'}>
        Login In 
     </Link>
     <Link 
     style={styles.login}
     href={'/Register'}>
        Register 
     </Link>
    <View>
      <Text>Index</Text>
    </View>
  )
}

export default Index

const styles = StyleSheet.create({})
