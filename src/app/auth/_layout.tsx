import { Stack } from "expo-router";

function AuthLayout() {
  return (
    <Stack screenOptions={{ headerTransparent: true, headerTitle: "" }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="signup" />
    </Stack>
  );
}

export default AuthLayout;
