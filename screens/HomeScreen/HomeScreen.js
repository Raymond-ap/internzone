import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

const HomeScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-white">
      <Header />
    </SafeAreaView>
  );
};

const Header = () => {
  return (
    <View className="px-5 bg-white py-5 flex flex-row items-center justify-between border-b border-gray-400">
      <Text className="text-xl font-bold capitalize tracking-wider">
        Internzone
      </Text>
      <View className="flex items-center flex-row">
        <TouchableOpacity
          activeOpacity={0.9}
          className="bg-gray-200 hover:bg-white p-1 rounded-full"
        >
          <Ionicons name="ios-search" size={20} color="black" />
        </TouchableOpacity>
        <View className="mx-1" />
        <TouchableOpacity
          activeOpacity={0.9}
          className="bg-gray-200 hover:bg-white p-1 rounded-full"
        >
          <Ionicons name="ios-notifications" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
