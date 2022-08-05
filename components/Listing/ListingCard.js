import { View, Text, TouchableOpacity, Platform } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const ListingCard = () => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className={` border px-1.5 py-3 border-gray-300 rounded-md hover:bg-gray-300 my-1 `}
    >
      <View className="flex flex-row items-center mb-2">
        <View className="h-10 w-10 rounded-md object-cover bg-blue-800 mr-3" />
        <View>
          <Text className="font-semibold text-base tracking-wider capitalize text-gray-800 ">
            Junior frontend developer
          </Text>
          <Text className="text-gray-600 font-bold text-xs capitalize">
            Accra Institute of technology
          </Text>
        </View>
      </View>
      <View className="flex flex-row items-center">
        <Text className="bg-gray-200 text-center hover:bg-gray-300 px-2 py-1.5 rounded-md font-bold text-xs capitalize">
          Full time
        </Text>
        <Text className="bg-gray-200 text-center mx-2 hover:bg-gray-300 px-2 py-1.5 rounded-md font-bold text-xs capitalize">
          internship
        </Text>
        <Text className="bg-gray-200 text-center hover:bg-gray-300 px-2 py-1.5 rounded-md font-bold text-xs capitalize">
          $3k/mo
        </Text>
      </View>
      <View className="flex flex-row items-center">
      </View>
    </TouchableOpacity>
  );
};

export default ListingCard;
