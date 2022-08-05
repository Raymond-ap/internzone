import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import ListingCard from "./ListingCard";

const RenderListings = () => {
  return (
    <View>
      <View className="flex flex-row items-center justify-between">
        <Text className="capitalize font-semibold text-base tracking-wider text-gray-800 px-5 mb-2">
          Recently added
        </Text>
        <TouchableOpacity activeOpacity={0.8}>
            <Text className="text-gray-600">See all</Text>
        </TouchableOpacity>
      </View>

      <ListingCard />
    </View>
  );
};

export default RenderListings;
