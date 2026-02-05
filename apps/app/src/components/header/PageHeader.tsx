import ArrowIcons from 'assets/icon/arrow_icon'
import { router } from 'expo-router'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Colors, Spacing } from 'src/shared/token'

interface IProps {
  title: string
  isEnabledBack?: boolean
  onLeftPress?: () => void
}

const PageHeader = ({ title = 'Header', isEnabledBack, onLeftPress }: IProps) => {
  const topInset = useSafeAreaInsets().top
  const height = 55
  
  
  const handleLefttPress = () => {
    if (onLeftPress) {
      onLeftPress();
    }else {
      router.back() 
    }
    
    
  }
  
  

  return (
    <View style={[{ ...styles.container, height: topInset + height }]}>
      <View style={{ ...styles.header, height }}>
        <Text style={styles.title}>{title} </Text>
      </View>
      
      {isEnabledBack && (
      <Pressable
      onPress={handleLefttPress}
      style={{
        position: "absolute",
        left: Spacing.horizontal,
        bottom: 0,
        alignItems: 'flex-start',
        width: 50,
        justifyContent: 'center',
        height
      }}>
        
        <ArrowIcons size={24} color={Colors.textPrimary}/>
      </Pressable>
        
      )}
    </View>
  )
}

export default PageHeader

const styles = StyleSheet.create({
  container: {
    backgroundColor:"#262e3d",
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    color: "#00beff"
  }
})
