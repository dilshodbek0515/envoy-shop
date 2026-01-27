import { StyleSheet, Text, View } from "react-native";
import { Stack } from "expo-router";
const AppLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#171c26" },
      }}
    ></Stack>
  );
};

export default AppLayout;

const styles = StyleSheet.create({});
