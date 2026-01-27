import { StyleSheet, Text, View } from 'react-native'
import { Link } from 'expo-router'
const EnvoyShop = () => {
  return (
    <View style={styles.log}>
     <Link 
     style={styles.login}
     href={'#/'}>
        Login In 
     </Link>
    </View>
  )
}

export default EnvoyShop

const styles = StyleSheet.create({
    log: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center' 
    },
    login: {
     width: 200,
     height: 80,
     backgroundColor: 'black',
     color: '#ffff',
     fontSize: 50,
    }
})