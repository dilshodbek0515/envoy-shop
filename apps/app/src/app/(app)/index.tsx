import { Link } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'

const Index = () => {
  return (
    <View style={styles.container}>
      <Link style={styles.login} href='/Login'>
        Login In
      </Link>

      <Link style={styles.login} href='/Register'>
        Register
      </Link>
    </View>
  )
}

export default Index

const styles = StyleSheet.create({
  log: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logs: {
    width: 300,
    backgroundColor: 'black',
    flexDirection: 'row',
    gap: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 8
  },
  login: {
    width: 100,
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    backgroundColor: '#fff'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
