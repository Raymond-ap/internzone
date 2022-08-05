import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";

const Onboarding = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="bg-white" style={{ flex: 1 }}>
      <View className="px-7 h-full justify-center items-center">
        <Text className="text-xl font-semibold capitalize text-center tracking-wider mb-3">
          Logo
        </Text>
        <View className="my-10">
          <Image
            source={require("../assets/onboarding.png")}
            resizeMode="cover"
            className="w-64 h-64 rounded-full bg-blue-400"
          />
        </View>
        <View>
          <Text className="text-xl font-semibold capitalize text-center tracking-wider mb-3">
            Find internships that match your skills and interests
          </Text>
          <Text className="text-center text-base text-gray-600 tracking-wider">
            Get access to millions of companies
          </Text>
          <View className="my-10 justify-center items-center">
            <TouchableOpacity
              onPress={() => navigation.navigate("HomeScreen")}
              activeOpacity={0.8}
              className="bg-black rounded-md shadow-lg px-5 py-3 w-64 items-center justify-center "
            >
              <Text className="text-base font-semibold text-white text-center">
                Get Started
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <StatusBar style="dark" backgroundColor="#fff" translucent={false} />
    </SafeAreaView>
  );
};

export default Onboarding;
