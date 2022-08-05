import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

const SuggestCard = () => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      className="px-2 py-2 rounded-lg shadow-sm bg-gray-900 hover:bg-gray-800 w-72 my-1 mx-2"
    >
      <View className="flex flex-row items-center justify-between">
        <Image 
        source={{uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png"}}
        resizeMode="cover"
        className="w-10 h-10 rounded-md" />
        <Text className="text-base mb-0.5 font-semibold capitalize bg-cyan-500 py-0.5 px-3 rounded-md text-white">
          Open
        </Text>
      </View>
      <View className="my-2">
        <Text className="text-base mb-0.5 font-semibold capitalize text-white">
          Senior Developer
        </Text>
        <Text className="text-sm font-semibold capitalize text-slate-300">
          accra institute of technology
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SuggestCard;
