import "react-native-gesture-handler";
import { useMemo, useState, useEffect } from "react";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { FugazOne_400Regular } from "@expo-google-fonts/fugaz-one";
import AppNavigator from "./src/navigation/AppNavigator";
import { ThemeContext, ThemeScheme } from "./src/context/ThemeContext";
import * as ExpoSplashScreen from "expo-splash-screen";

ExpoSplashScreen.preventAutoHideAsync().catch(() => {
  /* ignore */
});

const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#f5eef7e8",
    card: "#ddc5e7",
    text: "#0f172a",
    border: "#cd8cf3",
    primary: "#5e1a96",
    notification: "#5e1a96",
  },
};

const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: "#14021f",
    card: "#27132b",
    text: "#f8fafc",
    border: "#334155",
    primary: "#5e1a96",
    notification: "#5e1a96",
  },
};

// Move splash handling inside the component and use the expo-splash-screen module

export default function App() {
  const [scheme, setScheme] = useState<ThemeScheme>("light");
  const [fontsLoaded] = useFonts({
    FugazOne_400Regular,
  });

  const theme = useMemo(
    () => (scheme === "dark" ? darkTheme : lightTheme),
    [scheme]
  );

  const toggleScheme = () => {
    setScheme((current) => (current === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    if (!fontsLoaded) {
      return;
    }

    ExpoSplashScreen.hideAsync().catch(() => {
      /* ignore */
    });
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ scheme, toggleScheme }}>
      <NavigationContainer theme={theme}>
        <AppNavigator />
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}
