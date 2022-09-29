import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "styled-components";
import "intl";
import "intl/locale-data/jsonp/pt-BR";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { StatusBar } from "react-native";

import theme from "./src/global/styles/theme";

import { Routes } from "./src/routes/index.routes";
import { SingIn } from "./src/screens/SingIn";
import { AuthProvider } from "./src/context/Auth";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle={"light-content"}
        translucent
        backgroundColor={theme.colors.primary}
      />
      <NavigationContainer>
        <AuthProvider>
          {/* <Routes /> */}
          <SingIn />
        </AuthProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
}
