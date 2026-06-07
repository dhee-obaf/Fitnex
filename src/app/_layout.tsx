import { useEffect, useMemo, useState } from "react";
import { View, useColorScheme } from "react-native";
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { FugazOne_400Regular } from "@expo-google-fonts/fugaz-one";
import * as ExpoSplashScreen from "expo-splash-screen";

import AppNavigator from "../navigation/AppNavigator";
import SplashScreen from "../screens/SplashScreen";
import { ThemeContext, ThemeScheme } from "../context/ThemeContext";

ExpoSplashScreen.preventAutoHideAsync().catch(() => {
  /* ignore */
});

const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#f0e4f3e8",
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
    notification: "5e1a96",
  },
};

export default function AppLayout() {
  const deviceScheme = useColorScheme();
  const [scheme, setScheme] = useState<ThemeScheme>(
    deviceScheme === "dark" ? "dark" : "light"
  );
  const [fontsLoaded] = useFonts({ FugazOne_400Regular });
  const [appIsReady, setAppIsReady] = useState(false);

  const theme = useMemo(
    () => (scheme === "dark" ? darkTheme : lightTheme),
    [scheme]
  );

  const toggleScheme = () => {
    setScheme((current) => (current === "dark" ? "light" : "dark"));
  };

  const themeContextValue = useMemo(
    () => ({ scheme, toggleScheme }),
    [scheme]
  );

  useEffect(() => {
    async function prepare() {
      try {
        if (fontsLoaded) {
          await ExpoSplashScreen.hideAsync();
          setAppIsReady(true);
        }
      } catch (error) {
        console.warn(error);
      }
    }

    prepare();
  }, [fontsLoaded]);

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <View style={{ flex: 1 }}>
        <NavigationContainer theme={theme}>
          <AppNavigator />
        </NavigationContainer>
        {!appIsReady && <SplashScreen overlay />}
      </View>
    </ThemeContext.Provider>
  );
}
