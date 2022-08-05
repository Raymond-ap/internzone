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
import AsyncStorage from "@react-native-async-storage/async-storage";

const Onboarding = () => {
  const navigation = useNavigation();

  const handleNavigation = async () => {
    navigation.replace("Preference");
    // const firstLaunch = await AsyncStorage.getItem("firstLaunch");
    // if (!firstLaunch) {
    //   await AsyncStorage.setItem("firstLaunch", "true");
    //   navigation.replace("Preference");
    // } else {
    //   navigation.replace("Home");
    // }
  };

  return (
    <SafeAreaView className="bg-white" style={{ flex: 1 }}>
      <View className="px-7 h-full justify-center items-center">
        <Text className="text-xl font-bold capitalize text-center tracking-wider mb-3">
          internzone
        </Text>
        <View className="my-10">
          <Image
            source={require("../assets/onboarding.png")}
            resizeMode="cover"
            className="w-64 h-64 rounded-full"
          />
        </View>
        <View>
          <Text className="text-xl font-semibold capitalize text-center tracking-wider mb-3">
            Find internships that match your skills and interests
          </Text>
          <Text className="text-center text-base text-gray-600 tracking-wider">
            Get access to millions of offers
          </Text>
          <View className="my-10 justify-center items-center">
            <TouchableOpacity
              onPress={() => handleNavigation()}
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
