import { useState } from "react";
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Jismoniy from "./Jismoniy/Jismoniy";
import { Spacing } from "src/shared/token";
import Yuridik from "./Yuridik/Yuridik";

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

      <View style={styles.touchableView}>
        <TouchableOpacity style={styles.touchable}>
          <Text style={styles.touchableTitle}>Davom etish</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: Spacing.horizontal,
    marginBottom: 5,
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#2E3749",
    paddingHorizontal: Spacing.horizontal,
    marginTop: 118,
    height: 56,
  },

  button: {
    flex: 1,
    height: "100%",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4A90E2",
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
    height: 48,
    justifyContent: "center",
    backgroundColor: "#2E3749",
  },
  buttonInActiveColorText: {
    color: "white",
  },
  touchableView: {
    width: "100%",
    height: 102,
    backgroundColor: "#262E3D",
    position: "absolute",
    bottom: 0,
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Spacing.horizontal,
  },
  touchable: {
    width: "100%",
    height: 55,
    borderWidth: 1.5,
    borderColor: "#00beff",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  touchableTitle: {
    fontSize: 20,
    color: "#00beff",
  },
});
