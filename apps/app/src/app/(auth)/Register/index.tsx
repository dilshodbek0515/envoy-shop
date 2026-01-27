import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const Register = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ro'yhatdan otish</Text>
      </View>

      <Text
        style={styles.link}
        onPress={() => router.push("/Register/Oluvchi")}
      >
        Oluvchi
      </Text>

      <Text
        style={styles.link}
        onPress={() => router.push("/Register/Sotuvchi")}
      >
        Sotuvchi
      </Text>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  link: {
    color: "red",
    fontSize: 16,
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
});
