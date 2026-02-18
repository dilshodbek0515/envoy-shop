import { Stack } from "expo-router";
const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#171C26" },
      }}
    />
  );
};

export default Layout;
