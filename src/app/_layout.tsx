import { Stack } from "expo-router";
import { MovieProvider } from "../context/MovieContext";

export default function RootLayout() {
  return (
    <MovieProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="details" options={{ headerShown: false }} />
      </Stack>
    </MovieProvider>
  );
}
