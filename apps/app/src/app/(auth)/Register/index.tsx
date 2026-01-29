import { router } from "expo-router";
import { useRef } from "react";
import {
  Animated,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width: screenWidth } = Dimensions.get("window");
const Register = () => {
  const scaleAnim1 = useRef(new Animated.Value(1)).current;
  const scaleAnim2 = useRef(new Animated.Value(1)).current;

  const animatePress = (scaleAnim: any) => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ro'yhatdan otish</Text>
      </View>

      <View style={styles.button_container}>
        <Pressable
          onPressIn={() => {
            animatePress(scaleAnim1);
          }}
          onPress={() => {
            router.push("/Register/Oluvchi");
          }}
        >
          {({ pressed }) => (
            <Animated.View
              style={[
                styles.button,
                pressed && styles.buttonActive,
                { transform: [{ scale: scaleAnim1 }] },
              ]}
            >
              <Text style={[styles.link, pressed && styles.linkActive]}>
                Oluvchi
              </Text>
            </Animated.View>
          )}
        </Pressable>

        <Pressable
          onPressIn={() => {
            animatePress(scaleAnim2);
          }}
          onPress={() => {
            router.push("/Register/Sotuvchi");
          }}
        >
          {({ pressed }) => (
            <Animated.View
              style={[
                styles.button,
                pressed && styles.buttonActive,
                { transform: [{ scale: scaleAnim2 }] },
              ]}
            >
              <Text style={[styles.link, pressed && styles.linkActive]}>
                Sotuvchi
              </Text>
            </Animated.View>
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 122,
  },
  header: {
    width: "100%",
    height: 102,
    backgroundColor: "#262e3d",
    position: "absolute",
    top: 0,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 35,
    gap: 20,
  },
  headerTitle: {
    fontSize: 18,
    color: "#00beff",
  },

  button_container: {
    flexDirection: "row",
    gap: 25,
    marginHorizontal: 120,
  },
  button: {
    flex: 1,
    height: 50,
    minWidth: 175,
    maxWidth: (screenWidth - 60) / 2,
    borderWidth: 1,
    borderColor: "#00BEFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 18,
    backgroundColor: "transparent",
  },
  link: {
    color: "#00BEFF",
    fontSize: 16,
  },
  buttonActive: {
    backgroundColor: "#00BEFF",
    borderColor: "#00BEFF",
    transform: [{ scale: 0.98 }],
  },
  linkActive: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
