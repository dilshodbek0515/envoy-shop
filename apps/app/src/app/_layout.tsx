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