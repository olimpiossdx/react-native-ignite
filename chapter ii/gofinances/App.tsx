import React from "react";

import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import { StatusBar } from 'react-native';
import { ThemeProvider } from "styled-components";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import { NavigationContainer } from "@react-navigation/native";

import theme from "./src/global/styles/theme";
import { AppRoutes } from "./src/routes/app.route";
import { SignIn } from "./src/screens/SignIn";
import { AuthProvider } from "./src/hooks/auth";

export default function App() {
  const [loadingFonts] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!loadingFonts) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <StatusBar barStyle='light-content' backgroundColor={theme.colors.primary.main} />
        <AuthProvider>
          <SignIn />
        </AuthProvider>
      </NavigationContainer>
    </ThemeProvider >
  );
}
