import { DarkTheme, DefaultTheme, Slot, ThemeProvider } from "expo-router";
import { useColorScheme } from "react-native";

export default function RootLayout() {
  const scheme = useColorScheme();

  return (
    <ThemeProvider
      value={scheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <Slot />
    </ThemeProvider>
  );
}