import { useRef, useState } from "react";
import {
  Animated,
  FlatList,
  Keyboard,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors, Screens } from "src/shared/token";
import Register from "../(auth)/Register";
import Login from "../(auth)/Login";
import ButtonApp from "src/shared/ui/Button/button";

const pages = [
  {
    id: 1,
    component: <Login />,
  },
  {
    id: 2,
    component: <Register />,
  },
];

export default function Auth() {
  const [activePage, setActivePage] = useState(0);
  const pageRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  
  const viewablePage = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActivePage(viewableItems[0].index);
    }
  }).current;

  const viewableConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  const goToPage = (index: number) => {
    pageRef.current?.scrollToIndex({
      index,
      animated: true,
    });
    Keyboard.dismiss();
  };
  const renderPage = ({ item }: any) => {
    const isLogin = item.id === 1;
    const isRegister = item.id === 2; 

    return (
      <View style={styles.page}>
        <View style={{flex: 1}}>
        {item.component}
        </View>

        {/* {!isRegister && (
          <View style={{padding: 20}}>
            <ButtonApp label="Dasturga kirish"/> 
          </View>
        )} */}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <AuthTab goToPage={goToPage} activePage={activePage}  scrollX={scrollX} />

      <Animated.FlatList
        ref={pageRef}
        data={pages}
        renderItem={renderPage}
        keyExtractor={(page) => page.id.toString()}
        horizontal
        pagingEnabled
        onViewableItemsChanged={viewablePage}
        viewabilityConfig={viewableConfig}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: {x: scrollX}}}],
          { useNativeDriver: false}
        )}
      />
    </View>
  );
}

const AuthTab = ({ goToPage, activePage, scrollX }: any) => {
  const insetTop = useSafeAreaInsets().top;
  const height = 70 + insetTop;
  
  const tabWidth = Screens.width / 2;
  
  const inputRange = [0, Screens.width];
  
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: [0, tabWidth]
  });
  
  const loginColor = scrollX.interpolate({
    inputRange,
    outputRange: [Colors.primary, Colors.textPrimary]
  });
  
  const registerColor = scrollX.interpolate({
    inputRange,
    outputRange: [Colors.textPrimary, Colors.primary]
  })
  
  
  return (
    <View style={[styles.tabContainer, { height }]}>
      <Pressable style={styles.tabBox} onPress={() => goToPage(0)}>
        <Animated.Text
          style={[styles.tabTitle, 
          {color: loginColor}
          ]}
        >
          Dasturga kirish
        </Animated.Text>
      </Pressable>

      <Pressable style={styles.tabBox} onPress={() => goToPage(1)}>
        <Animated.Text
          style={[styles.tabTitle, 
          {color: registerColor}
          ]}
        >
          Register
        </Animated.Text>
      </Pressable>

      <Animated.View
        style={[
          styles.indicator,
          {
            width: tabWidth,
            transform: [{ translateX }],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  page: {
    width: Screens.width,
    flex: 1,
  },

  tabContainer: {
    backgroundColor: "#262e3d",
    flexDirection: "row",
    alignItems: "flex-end",
  },

  tabBox: {
    flex: 1,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  tabTitle: {
    fontSize: 18,
    fontWeight: "400",
    color: Colors.textPrimary,
  },

  indicator: {
    width: 180,
    height: 3,
    backgroundColor: Colors.primary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "absolute",
    bottom: 0,
  },

});
