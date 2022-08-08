import { View, Text, TouchableOpacity, Platform, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToogleBookman } from "../../utils/Bookman";

const ListingCard = ({ item, bookmanArray }) => {
  const navigation = useNavigation();
  const [bookmanArr, setBookmanArr] = React.useState(bookmanArray);

  const getBookman = async () => {
    const bookman = await AsyncStorage.getItem("bookman");
    if (bookman) {
      setBookmanArr(JSON.parse(bookman));
    }
  };

  React.useEffect(() => {
    getBookman();
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate("ListingDetail", { docId: item.id })}
      className={` px-1.5 py-3  rounded-md  hover:bg-gray-300 my-1 `}
    >
      <View className="flex flex-row justify-between mb-2">
        <View style={{ flex: 1 }} className="flex flex-row">
          <Image
            source={{ uri: item?.logo }}
            resizeMode="cover"
            className="h-10 w-10 rounded-md object-cover mr-3"
          />
          <View style={{ flex: 1 }}>
            <Text className="font-semibold text-base tracking-wider capitalize text-gray-800 ">
              {item?.title}
            </Text>
            <Text className="text-gray-600 font-bold text-xs capitalize">
              {item?.company}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            getBookman();
            ToogleBookman(item.id);
          }}
          activeOpacity={0.8}
        >
          <Ionicons
            name={`${
              bookmanArray.includes(item.id)
                ? "ios-bookmark"
                : "ios-bookmark-outline"
            }`}
            size={24}
            className="text-gray-500"
          />
        </TouchableOpacity>
      </View>
      <View className="flex flex-row items-center">
        <Text
          style={{ flex: 1 }}
          className="bg-gray-200 w-full text-center hover:bg-gray-300 px-2 py-1.5 rounded-md font-bold text-xs capitalize"
        >
          {item?.jobType}
        </Text>
        <Text
          style={{ flex: 1 }}
          className="bg-gray-200 w-full text-center mx-2 hover:bg-gray-300 px-2 py-1.5 rounded-md font-bold text-xs capitalize"
        >
          {item?.jobLevel}
        </Text>
        <Text
          style={{ flex: 1 }}
          className="bg-gray-200 w-full text-center hover:bg-gray-300 px-2 py-1.5 rounded-md font-bold text-xs capitalize"
        >
          {item?.location}
        </Text>
      </View>
      <View className="flex flex-row items-center"></View>
    </TouchableOpacity>
  );
};

export default ListingCard;
