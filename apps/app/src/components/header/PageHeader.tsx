import { StyleSheet, Text, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Colors } from 'src/shared/token'
import { router } from 'expo-router'

interface IProps {
    title: string
    isEnableBack?: boolean
    // onLeftPress?: () => void
    // onRightPress?: () => void
}

const PageHeader = ({
    title = "Header",
    isEnableBack,
    // onRightPress,
    // onLeftPress,
    
}: IProps) => {
 
const topInset = useSafeAreaInsets().top
const height  = 55 

// const handleRightPress = () => {
//   if (onRightPress) {
//     onRightPress();
//   }
//    else {
//     router.back()
//   }
// }
// const handleLeftPress = () => {
//   if (onLeftPress) {
//     onLeftPress();
//   }else{
//     router.back()
//   }
// }


return (
  <Animated.View 
  style={[{...styles.container, 
  height: topInset + height
  }, 
  ]}>
    
    <View style={{...styles.header, height}}>
      <Text style={styles.title}>{title} </Text>
    </View>
  </Animated.View>
  )

}





export default PageHeader

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.boxBackground,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    justifyContent: "flex-end",
    alignItems: 'center'
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    color: Colors.textPrimary
  }
})