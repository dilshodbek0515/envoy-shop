import { router } from "expo-router";
import { useRef } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";

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
          style={styles.button}
        >
          {({ pressed }) => (
            <Animated.View
              style={[
                styles.animated,
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
          style={styles.button}
        >
          {({ pressed }) => (
            <Animated.View
              style={[
                styles.animated,
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
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 20,
  },
  button: {
    width: "50%",
    height: 50,
    borderWidth: 1,
    borderColor: "#00BEFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 18,
    backgroundColor: "transparent",
  },
  animated: {
    width: "100%",
    height: 50,
    borderWidth: 1,
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
