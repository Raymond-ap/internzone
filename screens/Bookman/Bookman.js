import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AnimatedLoader, ListingCard } from "../../components";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const Bookman = () => {
  const [scrollHeight, setscrollHeight] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [listing, setListing] = React.useState([]);
  const [bookmanID, setBookmanID] = React.useState([]);

  const getBookman = async () => {};

  const onRefresh = async () => {
    setIsLoading(true);
    await wait(2000);
    getBookman();
  };

  React.useEffect(() => {
    getBookman();
  }, [isLoading]);

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-white">
      <Header scrollHeight={scrollHeight} />
      <View className="px-3 py-3">
        {listing.length > 0 ? (
          <FlatList
            data={listing}
            renderItem={({ item }) => (
              <ListingCard listing={item} bookmanArray={bookmanID} />
            )}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            onScroll={(e) => {
              setscrollHeight(e.nativeEvent.contentOffset.y);
            }}
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
            }
          />
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
            }
          >
            <View className="flex items-center justify-center h-full">
              <View className="h-20 w-20 object-cover bg-blue-600 mb-3" />
              <Text className="text-gray-600 text-base">
                No saved jobs found. Save a job to see it here.
              </Text>
            </View>
          </ScrollView>
        )}
      </View>
      <StatusBar style="dark" backgroundColor="#fff" translucent={false} />
      {isLoading && <AnimatedLoader />}
    </SafeAreaView>
  );
};

const Header = ({ scrollHeight }) => {
  return (
    <View
      className={`${
        scrollHeight > 0 && "border-b border-gray-400 shadow-lg"
      } px-3 bg-white py-3 flex flex-row items-center justify-between z-50`}
    >
      <Text className="text-base font-semibold capitalize tracking-wider">
        Your saved jobs
      </Text>
    </View>
  );
};

export default Bookman;
