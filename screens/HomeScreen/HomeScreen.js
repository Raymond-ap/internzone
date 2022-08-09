import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  FlatList,
  RefreshControl,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import {
  Suggestion,
  ListingCard,
  AnimatedLoader,
} from "../../components";
import { db } from "../../firebase";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HandleOffline } from "../../utils/Offline";

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
    try {
      setIsLoading(true);
      const listings = await db.collection("listings").get();
      const listingsArray = listings.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setListing(listingsArray);
      getBookman();
      setIsLoading(false);
    } catch (err) {
      HandleOffline(err.message, fetchData);
    }
  };

  const onRefresh = async () => {
    setIsLoading(true);
    await wait(1000);
    fetchData();
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-white">
      <Header scrollHeight={scrollHeight} />
      {listing.length > 0 ? (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
          onScroll={({ nativeEvent }) => {
            setScrollHeight(nativeEvent.contentOffset.y);
          }}
          data={listing}
          keyExtractor={(_, index) => index.toString()}
          ListHeaderComponent={() => (
            <View className="pt-5">
              <Suggestion data={listing} />
              <View>
                <Text className="px-3 py-3 capitalize font-semibold text-base tracking-wider text-gray-800 ">
                  Recently added
                </Text>
              </View>
            </View>
          )}
          renderItem={({ item }) => (
            <View className="px-3">
              <ListingCard item={item} bookmanArray={bookmanArray} />
            </View>
          )}
        />
      ) : (
        /* <ScrollView
          style={{ flex: 1 }}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
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
        </ScrollView> */
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
          onScroll={(e) => {
            const scrollHeight = e.nativeEvent.contentOffset.y;
            setScrollHeight(scrollHeight);
          }}
        >
          <View className="py-5 px-3 items-center">
            <Image
              source={require("../../assets/empty.png")}
              resizeMode="contain"
              className="mb-5 w-64 h-64"
            />
            <Text className="text-center">No listings found</Text>
            <TouchableOpacity
              onPress={() => fetchData()}
              activeOpacity={0.8}
              className="my-10 w-32 py-2 rounded-md shadow-sm justify-center items-center bg-blue-600"
            >
              <Text className="text-white text-base">Retry</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
      {isLoading && <AnimatedLoader />}
      <StatusBar style="dark" backgroundColor="#fff" translucent={false} />
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
