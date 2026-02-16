import { StyleSheet, Text, View } from "react-native";
import { Stack } from "expo-router";
const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#171c26" },
      }}
    />
  );
};

export default Layout;

const styles = StyleSheet.create({});
