import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

const Register = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ro'yhatdan otish</Text>
      </View>

      <View style={styles.button_container}>
        <Pressable
          style={styles.button}
          onPress={() => router.push("/Register/Oluvchi")}
        >
          <Text style={styles.link}>Oluvchi</Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => router.push("/Register/Sotuvchi")}
        >
          <Text style={styles.link}>Sotuvchi</Text>
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
  headerBorder: {
    borderWidth: 3,
    width: 121,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderColor: "#00beff",
  },
  button_container: {
    flexDirection: "row",
    gap: 25,
    marginHorizontal: 120,
  },
  button: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#00BEFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 18,
  },
  link: {
    color: "#00BEFF",
    fontSize: 16,
  },
});
