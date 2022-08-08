import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ToogleBookman = async (docId) => { 
  const bookman = await AsyncStorage.getItem("bookman");
  console.log("bookman", bookman);
  if (bookman) {
    const bookmanArray = JSON.parse(bookman);
    const index = bookmanArray.indexOf(docId);
    if (index > -1) {
      bookmanArray.splice(index, 1);
    } else {
      bookmanArray.push(docId);
    }
    await AsyncStorage.setItem("bookman", JSON.stringify(bookmanArray));
  } else {
    await AsyncStorage.setItem("bookman", JSON.stringify([docId]));
  } 
};

//  await AsyncStorage.removeItem("bookman");
