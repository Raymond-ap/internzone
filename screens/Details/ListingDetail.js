import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AnimatedLoader } from "../../components";

const ListingDetail = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const navigation = useNavigation();
  return (
    <SafeAreaView className="bg-white" style={{ flex: 1 }}>
      <View className="flex flex-row justify-between px-3 py-4 z-50">
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="ios-arrow-back" size={24} color="black" />
        </TouchableOpacity>
        {!isLoading && (
          <View className="flex flex-row items-center">
            <TouchableOpacity activeOpacity={0.8}>
              <Ionicons name="ios-bookmark-outline" size={20} color="black" />
            </TouchableOpacity>
            <View className="mx-1" />
            <TouchableOpacity activeOpacity={0.8}>
              <Ionicons name="ios-share-outline" size={20} color="black" />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <StatusBar style="dark" backgroundColor="#fff" translucent={false} />
      {isLoading && <AnimatedLoader />}
    </SafeAreaView>
  );
};

export default ListingDetail;
