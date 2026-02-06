 import { useRef, useState } from "react";
import {
  FlatList,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors, Screens } from "src/shared/token";
import Register from "../(auth)/Register";
import Login from "../(auth)/Login";
import { router } from "expo-router";



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
    return (
      <View style={styles.page}>
        {item.component}

        {item.id === 1 && (
          <View style={styles.touchBox} pointerEvents="box-none">
            <TouchableOpacity
              style={styles.touch}
              onPress={() => router.replace("./Yuridik/yuridik")}
            >
              <Text style={styles.touchText}>Dasturga kirish</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <AuthTab goToPage={goToPage} activePage={activePage} />

      <FlatList
        ref={pageRef}
        data={pages}
        renderItem={renderPage}
        keyExtractor={(page) => page.id.toString()}
        horizontal
        pagingEnabled
        onViewableItemsChanged={viewablePage}
        viewabilityConfig={viewableConfig}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const AuthTab = ({ goToPage, activePage }: any) => {
  const insetTop = useSafeAreaInsets().top;
  const height = 70 + insetTop;

  return (
    <View style={[styles.tabContainer, { height }]}>
      <Pressable style={styles.tabBox} onPress={() => goToPage(0)}>
        <Text
          style={[
            styles.tabTitle,
            activePage === 0 && styles.activeTabTitle,
          ]}
        >
          Dasturga kirish
        </Text>
        {activePage === 0 && <View style={styles.indicator} />}
      </Pressable>

      <Pressable style={styles.tabBox} onPress={() => goToPage(1)}>
        <Text
          style={[
            styles.tabTitle,
            activePage === 1 && styles.activeTabTitle,
          ]}
        >
          Register
        </Text>
        {activePage === 1 && <View style={styles.indicator} />}
      </Pressable>
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

  activeTabTitle: {
    color: Colors.primary,
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

  touchBox: {
    position: "absolute",
    bottom: 42,
    left: 0,
    right: 0,
    alignItems: "center",
    pointerEvents: "box-none",
  },

  touch: {
    width: 380,
    height: 58,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },

  touchText: {
    fontSize: 18,
    color: Colors.textPrimary,
  },
});
