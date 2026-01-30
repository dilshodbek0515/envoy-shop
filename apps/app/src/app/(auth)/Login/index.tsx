import { StyleSheet, View } from 'react-native'
import PageHeader from 'src/components/header/PageHeader'

const Login = () => {
  return (
    <View style={styles.log}>
      <PageHeader title='Login' isEnableBack />
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  log: {
    flex: 1
  }
})
