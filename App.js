import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "./router";
import { useCallback } from 'react/cjs/react.development';
import { useFonts } from "expo-font";

export default function App() {
  const routing = useRoute(false);

  const [customFonts] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (customFonts) {
      await SplashScreen.hideAsync();
    }
  }, [customFonts]);

  if (!customFonts) {
    return null;
  }

  return (  
    <>
      <StatusBar style="auto" />
      <NavigationContainer onLayout={onLayoutRootView}>{routing}</NavigationContainer>
    </>
  );
}

