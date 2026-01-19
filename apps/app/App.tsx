import { Pressable, StyleSheet, Text, View } from "react-native";
import { Login } from "../../packages/api/login";
export default function App() {
  const appLogin = async () => {
    const user = await Login({
      phone: "+998975790515",
      password: "Dd05150515!",
    });
    console.log(user);
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={appLogin}>
        <Text style={{ fontSize: 50, color: "white" }}>Login</Text>
      </Pressable>
      <Pressable onPress={appLogin}>
        <Text style={{ fontSize: 50, color: "white" }}>Login</Text>
      </Pressable>
      <Pressable onPress={appLogin}>
        <Text style={{ fontSize: 50, color: "white" }}>Login</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
    alignItems: "center",
    justifyContent: "center",
  },
});
