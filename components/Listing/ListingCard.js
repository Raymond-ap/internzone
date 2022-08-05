import { View, Text, TouchableOpacity, Platform } from "react-native";
import React from "react";

const ListingCard = () => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className={`flex ${
        Platform.OS !== "ios" && Platform.OS !== "android"
          ? "flex-row justify-between"
          : "flex-col"
      } `}
    >
     
    </TouchableOpacity>
  );
};

export default ListingCard;
