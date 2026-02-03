import { useRef, useState } from "react";
import { FlatList, Keyboard, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors, Screens } from "src/shared/token";
import Register from "../(auth)/Register";
import Login from "../(auth)/Login";

const pages = [
    {
        id: 1, 
        title: 'Login', 
        component: (
            <Login/>
          )
    },
        
    {
        id: 2, 
        title: 'Registr',
        component: (
            <Register/>
        )
    },
]

export default function Auth() {
    const [activePage, setActivePage] = useState(0)
    const pageRef = useRef<FlatList>(null)
    const viewablePage = useRef(({viewableItems}: any) =>{
        if (viewableItems.length > 0) {
            setActivePage(viewableItems[0].index)
        }
    }).current
    
     const viewableConfig = useRef({
      viewAreaCoveragePercentThreshold: 50     
     }).current
     
     const goToPage = (index: number) => {
        pageRef.current?.scrollToIndex({
            index,
            animated: true
        }),
        Keyboard.dismiss()
     }
    
    const renderPage = ({item}: any) => {
       return <View style={styles.page}>
        {item.component}
        <Text style={styles.tabtext}></Text></View> 
    }
    
    
    
    return (
        <View style={styles.container}>
        <AuthTab goToPage={goToPage}/>
         <FlatList 
         data={pages} 
         renderItem={renderPage} 
         keyExtractor={(page) => page.id.toString()} 
         horizontal
         pagingEnabled
         onViewableItemsChanged={viewablePage}
         viewabilityConfig={viewableConfig}
         />   
        </View>
    )
}

 const AuthTab = ({goToPage}: any) => {
    const insetTop = useSafeAreaInsets().top;
    const height = 70 + insetTop
    
    
    return(
    <View style={[styles.tabContainer, {height} ]}>
        
     <Pressable style={styles.tabBox}>
        <Text style={styles.tabTitle}>Login</Text>
        </Pressable>   
     <Pressable style={styles.tabBox}>
        <Text style={styles.tabTitle}>Register</Text>
        </Pressable>   
    </View>
    )
 }

const styles = StyleSheet.create({
    container:{
       flex:1 
    },
    page: {
     width: Screens.width,
     justifyContent: 'center',
     alignItems: 'center',
    },
    tabtext: {
        fontSize: 100,
    },
    tabContainer: {
       height: 100,
       backgroundColor: Colors.boxBackground,
       flexDirection: 'row',
       alignItems: 'flex-end',
    },
    tabBox: {
        flex: 1,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tabTitle: {
       fontSize: 18,
       fontWeight: "600",
       color: Colors.textPrimary
    }
})