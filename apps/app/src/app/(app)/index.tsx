import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";

const Index = () => {
  return (
    <View style={styles.container}>
      <Link style={styles.login} href="/Login">
        Login In
      </Link>

      <Link style={styles.login} href="/Register">
        Register
      </Link>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  login: {
    fontSize: 18,
    color: "blue",
    marginBottom: 12,
  },
});
