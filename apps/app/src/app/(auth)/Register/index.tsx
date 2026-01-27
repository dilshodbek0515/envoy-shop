import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

<<<<<<< HEAD
const Login = () => {
  return (
    <View>
      <Text style={{ color: "red" }} onPress={() => router.back()}>
        Register
      </Text>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
=======
const Register = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.link} onPress={() => router.back()}>
        Register
      </Text>

      <Text
        style={styles.link}
        onPress={() => router.push("/Register/Oluvchi")}
      >
        Oluvchi
      </Text>

      <Text
        style={styles.link}
        onPress={() => router.push("/Register//Sotuvchi")}
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
  // login: {
  //   fontSize: 18,
  //   color: "blue",
  //   marginBottom: 12,
  // },
});
>>>>>>> cd65acaf48c02a2a16133cd2bbaa880d403b270e
