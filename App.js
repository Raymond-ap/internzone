import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TailwindProvider } from "tailwindcss-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TabNavigator from "./navigation/TabNavigator";

import { Onboarding, Preference, ListingDetail, SearchScreen } from "./screens";
import React from "react";

const Stack = createNativeStackNavigator();

export default function App() {
  const initialLuanch = async () => {
    const firstLaunch = await AsyncStorage.getItem("firstLaunch");
    if (!firstLaunch) {
      await AsyncStorage.setItem("firstLaunch", "true");
      return true;
    }
    return false;
  };

  LogBox.ignoreLogs([
    "ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types'"
  ]);

  React.useEffect(() => {
    initialLuanch();
  }, []);

  return (
    <NavigationContainer>
      <TailwindProvider>
        <Stack.Navigator
          initialRouteName="Onboarding"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="Preference" component={Preference} />
          <Stack.Screen name="Home" component={TabNavigator} />
          <Stack.Screen name="ListingDetail" component={ListingDetail} />
          <Stack.Screen name="SearchScreen" component={SearchScreen} />
        </Stack.Navigator>
      </TailwindProvider>
    </NavigationContainer>
  );
}
