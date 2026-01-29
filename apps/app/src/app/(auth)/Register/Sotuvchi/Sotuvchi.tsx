import { useState } from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import Yuridik from "./Yuridik/Yuridik";
import Jismoniy from "./Jismoniy/Jismoniy";

const { width: screenWidth } = Dimensions.get("window");

const Register = () => {
  const [activeButton, setActiveButton] = useState("yuridik");

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ro'yhatdan otish</Text>
      </View>

      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Pressable
            onPress={() => setActiveButton("Yuridik")}
            style={[
              styles.button,
              activeButton === "Yuridik"
                ? styles.buttonActiveColor
                : styles.buttonInActiveColor,
            ]}
          >
            <Text
              style={[
                styles.buttonText,
                activeButton === "Yuridik"
                  ? styles.buttonActiveColorText
                  : styles.buttonInActiveColorText,
              ]}
            >
              Yuridik
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setActiveButton("Jismoniy")}
            style={[
              styles.button,
              activeButton === "Jismoniy"
                ? styles.buttonActiveColor
                : styles.buttonInActiveColor,
            ]}
          >
            <Text
              style={[
                styles.buttonText,
                activeButton === "Jismoniy"
                  ? styles.buttonActiveColorText
                  : styles.buttonInActiveColorText,
              ]}
            >
              Jismoniy
            </Text>
          </Pressable>
        </View>
      </View>

      {activeButton === "Yuridik" && <Yuridik />}

      {activeButton === "Jismoniy" && <Jismoniy />}
    </>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
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
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  headerTitle: {
    fontSize: 18,
    color: "#00beff",
  },
  buttonContainer: {
    width: "100%",
    height: 56,
    backgroundColor: "#2E3749",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 18,
    marginTop: 120,
    paddingHorizontal: 10,
  },
  button: {
    minWidth: 182,
    maxWidth: (screenWidth - 60) / 2,
    borderRadius: 14,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
  },
  buttonActiveColor: {
    height: 48,
    justifyContent: "center",
    backgroundColor: "#262E3D",
  },
  buttonActiveColorText: {
    color: "#00beff",
  },
  buttonInActiveColor: {
    // width: "100%",
    height: 48,
    justifyContent: "center",
    backgroundColor: "#2E3749",
  },
  buttonInActiveColorText: {
    color: "white",
  },
});
