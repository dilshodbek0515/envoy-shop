import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

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
