import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
  Dimensions,
  RefreshControl,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import {
  Suggestion,
  ListingCard,
  RenderListings,
  AnimatedLoader,
} from "../../components";
import { db } from "../../firebase";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const HomeScreen = () => {
  const [scrollHeight, setScrollHeight] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [listing, setListing] = React.useState([]);
  const [bookmanArray, setBookmanArray] = React.useState([]);

  const getBookman = async () => {
    const bookman = await AsyncStorage.getItem("bookman");
    if (bookman) {
      setBookmanArray(JSON.parse(bookman));
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const listings = await db.collection("listings").get();
      const listingsArray = listings.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setListing(listingsArray);
      getBookman();
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  const onRefresh = async() => {
    setIsLoading(true);
    await wait(1000);
    fetchData();
  };

  React.useEffect(() => {
    fetchData();
    console.log(bookmanArray);

  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-white">
      <Header scrollHeight={scrollHeight} />
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl 
            refreshing={isLoading}
            onRefresh={onRefresh}
          />
        }
        showsVerticalScrollIndicator={false}
        onScroll={(e) => {
          const scrollHeight = e.nativeEvent.contentOffset.y;
          setScrollHeight(scrollHeight);
        }}
      >
        <View className="py-5">
          <Suggestion data={listing} />
        </View>
        <RenderListings data={listing} bookmanArray={bookmanArray} />
      </ScrollView>
      <StatusBar style="dark" backgroundColor="#fff" translucent={false} />
      {isLoading && <AnimatedLoader />}
    </SafeAreaView>
  );
};

const Header = ({ scrollHeight }) => {
  const navigation = useNavigation();
  return (
    <View
      className={`${
        scrollHeight > 0 && "border-b border-gray-400 shadow-lg"
      } px-3 bg-white py-2 flex flex-row items-center justify-between z-50`}
    >
      <Text className="text-xl font-bold capitalize tracking-wider">
        Internzone
      </Text>
      <View className="flex items-center flex-row">
        <TouchableOpacity
          onPress={() => navigation.navigate("SearchScreen")}
          activeOpacity={0.9}
          className="bg-gray-200 hover:bg-white p-1 rounded-full"
        >
          <Ionicons name="ios-search" size={20} color="black" />
        </TouchableOpacity>
        <View className="mx-1" />
        <TouchableOpacity
          activeOpacity={0.9}
          className="bg-gray-200 hover:bg-white p-1 rounded-full"
        >
          <Ionicons name="ios-notifications" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
