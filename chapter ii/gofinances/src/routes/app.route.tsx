import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "styled-components";

const { Navigator, Screen } = createBottomTabNavigator();

import { Dashboard } from "../screens/Dashboard";
import { Register } from "../screens/Register";
import { Platform } from "react-native";
import { Resume } from "../screens/Resume";

export function AppRoutes() {
  const theme = useTheme();
  return (<Navigator
    screenOptions={{
      headerShown: false,
      tabBarInactiveTintColor: theme.colors.border,
      tabBarActiveTintColor: theme.colors.secondary.main,
      tabBarLabelPosition: "beside-icon",
      tabBarStyle: {
        height: 88,
        paddingVertical: Platform.OS === "ios" ? 20 : 0,
      },
    }}>
    <Screen
      name="Listagem"
      component={Dashboard}
      options={{
        tabBarIcon: ({ color, size }) => {
          return (<MaterialIcons
            name="format-list-bulleted"
            size={size}
            color={color}
          />);
        }
      }}
    />
    <Screen
      name="Cadastrar"
      component={Register}
      options={{
        tabBarIcon: ({ color, size }) => {
          return (<MaterialIcons name="attach-money" size={size} color={color} />);
        }
      }}
    />
    <Screen
      name="Resumo"
      component={Resume}
      options={{
        tabBarIcon: ({ color, size }) => {
          return (<MaterialIcons name="pie-chart" size={size} color={color} />);
        }
      }}
    />
  </Navigator>);
};
