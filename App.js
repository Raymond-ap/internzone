import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TailwindProvider } from "tailwindcss-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { HomeScreen, Onboarding, Preference, ListingDetail } from "./screens";
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

  React.useEffect(() => {
    initialLuanch();
  }, []);

  return (
    <NavigationContainer>
      <TailwindProvider>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="Preference" component={Preference} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="ListingDetail" component={ListingDetail} />
        </Stack.Navigator>
      </TailwindProvider>
    </NavigationContainer>
  );
}
