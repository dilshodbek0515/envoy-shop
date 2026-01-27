<<<<<<< HEAD
import { Stack } from "expo-router";

export default function AppsLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: "#fff" }
            }}
        />
    )
}
=======
import { StyleSheet, Text, View } from "react-native";
import { Stack } from "expo-router";
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
>>>>>>> cd65acaf48c02a2a16133cd2bbaa880d403b270e
