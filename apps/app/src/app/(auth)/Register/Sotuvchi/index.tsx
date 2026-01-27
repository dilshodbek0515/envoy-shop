import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const Register = () => {
  const [activeButton, setActiveButton] = useState("");

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
    backgroundColor: "#EEEEEE",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 18,
    marginTop: 120,
  },
  button: {
    width: 160,
    borderRadius: 14,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
  },
  buttonActiveColor: {
    height: 48,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  buttonActiveColorText: {
    color: "#00beff",
  },
  buttonInActiveColor: {
    height: 48,
    justifyContent: "center",
    backgroundColor: "#eee",
  },
  buttonInActiveColorText: {
    color: "#000",
  },
});
