import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
const AppLayout = () => {
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#171c26" },
        }}
      ></Stack>
    </SafeAreaProvider>
  );
};

export default AppLayout;
