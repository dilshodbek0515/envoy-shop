import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#171c26" },
      }}
    ></Stack>
  );
};

export default Layout;

const styles = StyleSheet.create({});
