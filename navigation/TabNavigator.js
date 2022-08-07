import React from 'react-native'
import { View, Text } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {HomeScreen} from '../screens'

import { Ionicons, MaterialCommunityIcons} from '@expo/vector-icons'

const Tab = createBottomTabNavigator();


const Bookman = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Setting Screen</Text>
    </View>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Explore") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Bookman") {
            iconName = focused ? "bookmark" : "bookmark-outline";
          }
          return <MaterialCommunityIcons name={iconName} size={25} color={color} />;
        },
        tabBarHideOnKeyboard: true, 
        tabBarActiveTintColor: "#495057",
        tabBarInactiveTintColor: "#6B6F6E",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopColor: "transparent",
          height: 65,
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 10,
          paddingRight: 10,
          borderTopWidth: 1,
          borderTopColor: "#e9ecef",
        },
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 13,
        },
        // tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen name="Explore" component={HomeScreen} />
      <Tab.Screen name="Bookman" component={Bookman} />
    </Tab.Navigator>
  );
};

export default TabNavigator