import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import ListingCard from "./ListingCard";


const RenderListings = ({data}) => {
  return (
    <View className="px-3">
      <View className="flex flex-row items-center justify-between mb-2">
        <Text className="capitalize font-semibold text-base tracking-wider text-gray-800 ">
          Recently added
        </Text>
        <TouchableOpacity activeOpacity={0.8}>
          <Text className="text-gray-600 font-bold text-base">See all</Text>
        </TouchableOpacity>
      </View>

      <View className="my-1">
      {data.map((item, index) => {
        return <ListingCard key={index} item={item}/>
      })}
      </View>
    </View>
  );
};

export default RenderListings;
