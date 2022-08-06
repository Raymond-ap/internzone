import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ToogleBookman = async (docId) => {
  await AsyncStorage.removeItem("bookman");
};
